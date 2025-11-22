import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import type { RootState } from "../../../store/store";
import { useCallback, useState } from "react";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert, showSuccessAlert } from "../../../helpers/alert-helpers";
import { updateCurrentUser } from "../../../store/actions/user-action";

export const useAccountViewModel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((root: RootState) => root.authReducer);
    const [firstName, setFirstName] = useState<string>(user?.firstName ?? "");
    const [lastName, setLastName] = useState<string>(user?.lastName ?? "");
    const [phone, setPhone] = useState<string>(user?.phone ?? "");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const qTab = new URLSearchParams(location.search).get("tab");
    const mapSectionTabToNum = (t: "profile" | "password") => (t === "password" ? "2" : "1");
    const mapNumToSectionTab = (n: string | null) => (n === "2" ? ("password" as const) : ("profile" as const));
    const [activeTab, _setActiveTab] = useState<"profile" | "password">(mapNumToSectionTab(qTab));
    const isProfile = activeTab === "profile";
    const isPassword = activeTab === "password";

    const isPasswordRoute = qTab === "2";

    const handleAccountSettings = () => {
        navigate("/organizer/accounts-settings");
    }

    const handleSave = () => {

    }

    const setActiveTab = useCallback(
        (tab: "profile" | "password") => {
            _setActiveTab(tab);
            try {
                const params = new URLSearchParams(location.search);
                params.set("tab", mapSectionTabToNum(tab));
                const qs = params.toString();
                navigate(`${location.pathname}${qs ? `?${qs}` : ""}`, { replace: true });
            } catch { }
        },
        [location, navigate]
    );

    const handlePhotoChange = (f: File | null) => {
        setPhotoFile(f ?? null);
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const userData = new FormData();
            userData.append("firstName", firstName ?? "");
            userData.append("lastName", lastName ?? "");
            userData.append("phone", phone ?? "");
            if (photoFile) {
                userData.append("avatar", photoFile, photoFile.name);
            }

            showLoadingAlert();
            await dispatch<any>(updateCurrentUser(userData));
            await showSuccessAlert("Update information successfully");
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to update user information");
        } finally {
            closeLoadingAlert();
            setSaving(false);
        }
    };

    return {
        user,
        handleAccountSettings,
        handleSave,
        isProfile,
        isPassword,
        setActiveTab,
        isPasswordRoute,
        handlePhotoChange,
        handleSubmit,
        setFirstName,
        setLastName,
        setPhone,
        setPhotoFile,
        saving,
        firstName,
        lastName,
        phone,
        photoFile
    }
}