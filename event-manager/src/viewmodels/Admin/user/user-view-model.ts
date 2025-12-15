import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { getUsers, setSelectedUser, clearSelectedUser, updateStatusUser, addUser, getActiveOrgOfAnUser, getInActiveOrgOfAnUser, updateUser, getUserByEmail } from "../../../store/actions/user-action";
import { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { applyUserFilters } from "../../../utils/Admin/filter-user";
import { type FilterState } from "../../../utils/Admin/filter-user";
import { FILTER_STATE_DEFAULT } from "../../../utils/Admin/filter-user";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert, showSuccessAlert } from "../../../helpers/alert-helpers";
import { getEventsByOrganizerIds } from "../../../store/actions/event-action";

export const useUserViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, users, loading, activeOrganizers, inActiveOrganizers } = useSelector((state: RootState) => state.userReducer);
  const [cachedUserLocal, setCachedUserLocal] = useState<any | null>(null);
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [openRecDialog, setOpenRecDialog] = useState(false);
  const [detailEmail, setDetailEmail] = useState("");
  const selectedUserEmail = useSelector(
    (state: RootState) => state.userReducer.selectedUserEmail
  );
  const qTab = new URLSearchParams(location.search).get("tab");
  const mapListTabToNum = (t: "active" | "deleted") => (t === "deleted" ? "2" : "1");
  const mapNumToListTab = (n: string | null) => (n === "2" ? ("deleted" as const) : ("active" as const));
  const mapNumToDetailTab = (n: string | null) =>
    n === "2" ? ("active-organizer" as const) : n === "3" ? ("deleted-organizer" as const) : ("order" as const);
  const mapDetailTabToNum = (t: "order" | "active-organizer" | "deleted-organizer") =>
    t === "active-organizer" ? "2" : t === "deleted-organizer" ? "3" : "1";
  const [activeTab, _setActiveTab] = useState<"active" | "deleted">(mapNumToListTab(qTab));
  const [activeDetailTab, _setActiveDetailTab] = useState<"order" | "active-organizer" | "deleted-organizer">(mapNumToDetailTab(qTab));

  const setActiveTab = useCallback(
    (tab: "active" | "deleted") => {
      _setActiveTab(tab);
      try {
        const params = new URLSearchParams(location.search);
        params.set("tab", mapListTabToNum(tab));
        const qs = params.toString();
        navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true });
      } catch { }
    },
    [location, navigate]
  );

  const setActiveDetailTab = useCallback(
    (tab: "order" | "active-organizer" | "deleted-organizer") => {
      _setActiveDetailTab(tab);
      try {
        const params = new URLSearchParams(location.search);
        params.set("tab", mapDetailTabToNum(tab));
        const qs = params.toString();
        navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true });
      } catch { }
    },
    [location, navigate]
  );

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("tab");
    if (location.pathname.includes("/admin/users/details")) {
      const newDetail = mapNumToDetailTab(q);
      if (newDetail !== activeDetailTab) _setActiveDetailTab(newDetail);
    } else {
      const newList = mapNumToListTab(q);
      if (newList !== activeTab) _setActiveTab(newList);
    }
  }, [location.search, location.pathname]);

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        showLoadingAlert();
        await dispatch<any>(getUsers());
        closeLoadingAlert();
      } catch (error: any) {
        showErrorAlert(error?.message || "Failed to fetch users");
      }
    }

    getUsersInfo();
  }, [dispatch]);

  useEffect(() => {
    const qEmail = new URLSearchParams(location.search).get("email");
    const stateEmail = (location.state as any)?.user?.email;
    const emailFromQueryOrState = qEmail ?? stateEmail ?? "";
    if (emailFromQueryOrState && emailFromQueryOrState !== detailEmail) {
      setDetailEmail(emailFromQueryOrState);
    }
  }, [location.search, location.state]);

  useEffect(() => {
    if (!detailEmail) {
      setCachedUserLocal(null);
      return;
    }

    let mounted = true;
    let loadingTimer: any = null;

    const fetchDetailOfAnUser = async () => {
      try {
        const cached = users.find((u) => u.email === detailEmail) ?? null;
        if (cached && mounted) {
          setCachedUserLocal(cached);
        } else if (mounted) {
          setCachedUserLocal(null);
        }

        loadingTimer = setTimeout(() => {
          if (mounted) showLoadingAlert("Loading");
        }, 300);

        const fetchRes: any = await dispatch<any>(getUserByEmail(detailEmail));

        if (loadingTimer) {
          clearTimeout(loadingTimer);
          loadingTimer = null;
        }
        if (!mounted) return;

        const fetchedUser = fetchRes?.payload ?? fetchRes?.data ?? fetchRes;

        if (fetchedUser && mounted) {
          setCachedUserLocal(fetchedUser);
        }

        try { closeLoadingAlert(); } catch { }
      } catch (error: any) {
        if (!mounted) return;
        try { closeLoadingAlert(); } catch { }
        showErrorAlert(error?.message || "Failed to fetch information of this user");
      }
    };

    fetchDetailOfAnUser();

    return () => {
      mounted = false;
      if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
      }
    };
  }, [detailEmail, dispatch, users]);

  const getActiveOrganizersOfAnUser = useCallback(async (id: any) => {
    const res = await dispatch<any>(getActiveOrgOfAnUser(id));
    return res;
  }, [dispatch]);

  const getInActiveOrganizersOfAnUser = useCallback(async (id: any) => {
    const res = await dispatch<any>(getInActiveOrgOfAnUser(id));
    return res;
  }, [dispatch]);

  const fetchEventsByOrganizerIds = useCallback(
    async (organizerIds: number[]) => {
      try {
        showLoadingAlert("Loading");
        
        await dispatch<any>(getEventsByOrganizerIds(organizerIds));
        closeLoadingAlert();
      } catch (error: any) {
        showErrorAlert(error?.message || "Failed to get list events");
      }
    },
    [dispatch]
  );

  useEffect(() => {
    let mounted = true;
    const email = selectedUserEmail || detailEmail;
    if (!email) return;

    const user = users.find((u) => u.email === email) ?? null;
    const userId = user?.id ?? null;
    if (!userId) return;

    const run = async () => {
      try {
        if (activeDetailTab === "active-organizer") {
          const orgs = await getActiveOrganizersOfAnUser(userId);
          const ids: number[] = Array.isArray(orgs)
            ? orgs.map((o: any) => Number(o?.id)).filter((id) => !Number.isNaN(id))
            : [];
          if (mounted) await fetchEventsByOrganizerIds(ids);
        } else if (activeDetailTab === "deleted-organizer") {
          const orgs = await getInActiveOrganizersOfAnUser(userId);
          const ids: number[] = Array.isArray(orgs)
            ? orgs.map((o: any) => Number(o?.id)).filter((id) => !Number.isNaN(id))
            : [];
          if (mounted) await fetchEventsByOrganizerIds(ids);
        }
      } catch (error: any) {
        showErrorAlert(error?.message || "Failed to get organizers");
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, [
    activeDetailTab,
    detailEmail,
    selectedUserEmail,
    users,
    getActiveOrganizersOfAnUser,
    getInActiveOrganizersOfAnUser,
    fetchEventsByOrganizerIds,
  ]);

  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Avatar", accessor: "avatarUrl", type: "image" as const },
    { header: "First Name", accessor: "firstName", type: "text" as const },
    { header: "Last Name", accessor: "lastName", type: "text" as const },
    { header: "Email", accessor: "email", type: "text" as const },
    { header: "Phone", accessor: "phone", type: "text" as const },
    { header: "Role", accessor: "roles", type: "text" as const },
    { header: "Actions", accessor: "actions", type: "action" as const },
  ];

  const organizerColumns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Organizer Name", accessor: "name", type: "text" as const },
  ];

  const [filters, setFilters] = useState<FilterState>(FILTER_STATE_DEFAULT);

  const activeUsers = users.filter((u) => u.isActive);
  const inActiveUsers = users.filter((u) => !u.isActive);
  const filteredActiveUsers = applyUserFilters(activeUsers, filters);
  const filteredInActiveUsers = applyUserFilters(inActiveUsers, filters);


  const selectUser = useCallback(
    (email: string) => {
      dispatch(setSelectedUser({ email }));
    },
    [dispatch]
  );

  const clearUser = useCallback(() => {
    dispatch(clearSelectedUser());
  }, [dispatch]);

  const handleViewDetail = (email: string) => {
    const tabNum = mapDetailTabToNum(activeDetailTab);
    const params = new URLSearchParams(location.search);
    params.set("email", email);
    params.set("tab", tabNum);
    navigate(`/admin/users/details?${params.toString()}`);
  }

  const handleEdit = (email: string) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      navigate("/admin/users/edit", { state: { user } });
    }
  };

  const handleDelete = (email: string) => {
    clearUser();
    selectUser(email);
    setOpenDelDialog(true);
  }

  const confirmDelete = async () => {
    if (!selectedUserEmail) {
      setOpenDelDialog(false);
      showErrorAlert("Failed to delete user");
      return;
    }
    try {
      setOpenDelDialog(false);
      showLoadingAlert("Deleting user...");
      await dispatch<any>(updateStatusUser(selectedUserEmail, false))
      closeLoadingAlert();
      await showSuccessAlert("Deleted user successfully");
      clearUser();
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to delete user");
    }
  };

  const handleCreate = () => {
    navigate("/admin/users/create");
  }

  const handleRecover = (email: string) => {
    clearUser();
    selectUser(email);
    setOpenRecDialog(true);
  }

  const confirmRecover = async () => {
    if (!selectedUserEmail) {
      setOpenRecDialog(false);
      showErrorAlert("Failed to recover user");
      return;
    }
    try {
      setOpenRecDialog(false);
      showLoadingAlert("Recovering user...");
      await dispatch<any>(updateStatusUser(selectedUserEmail, true));
      closeLoadingAlert();
      await showSuccessAlert("Recovered user successfully");
      clearUser();
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to recover user");
    }
  }

  const handleUpdate = async (data: any) => {
    try {
      showLoadingAlert("Updating account...");
      await dispatch<any>(updateUser(data));
      closeLoadingAlert();
      await showSuccessAlert("Updated account successfully");
      navigate(-1);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to update account");
    }
  }

  const handleAdd = async (data: any) => {
    try {
      showLoadingAlert("Creating account...");
      await dispatch<any>(addUser(data));
      closeLoadingAlert();
      await showSuccessAlert("Added account successfully");
      navigate(-1);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to add account");
    }
  }

  const handleBack = () => {
    navigate(-1);
  }

  const displayedUser = user ?? cachedUserLocal;

  return {
    filteredActiveUsers,
    filteredInActiveUsers,
    columns,
    users,
    user: displayedUser,
    selectedUserEmail,
    openDelDialog,
    openRecDialog,
    activeTab,
    loading,
    location,
    activeDetailTab,
    organizerColumns,
    activeOrganizers,
    inActiveOrganizers,
    detailEmail,
    navigate,
    setActiveDetailTab,
    handleRecover,
    selectUser,
    clearUser,
    handleViewDetail,
    handleEdit,
    handleDelete,
    confirmDelete,
    setOpenDelDialog,
    setOpenRecDialog,
    handleCreate,
    setFilters,
    setActiveTab,
    confirmRecover,
    handleBack,
    handleUpdate,
    handleAdd,
    setDetailEmail
  };
};
