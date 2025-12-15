import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsAdmin } from "../../../store/actions/event-action";
import type { RootState } from "../../../store/store";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert } from "../../../helpers/alert-helpers";
import { getUsers } from "../../../store/actions/user-action";
import { fetchPermissions } from "../../../store/actions/permission-action";
import { getCategories } from "../../../store/actions/category-action";

export const useDashBoardViewModel = () => {
    const dispatch = useDispatch();
    const { numberOfEvents, publishedEvents, pendingEvents, allEvents, eventDashBoardList } = useSelector((root: RootState) => root.eventReducer);
    const { numberOfUsers, listUserDashBoard } = useSelector((root: RootState) => root.userReducer);
    const numberOfPermissions = useSelector((root: RootState) => root.permissionReducer?.numberOfPermissions ?? 0);
    const numberOfCategories = useSelector((root: RootState) => root.categoryReducer?.numberOfCategories ?? 0);
    const [monthCount, setMonthCount] = useState<number>(12);
    const today = new Date();
    const [endMonth, setEndMonth] = useState<number>(today.getMonth() + 1);
    const [endYear, setEndYear] = useState<number>(today.getFullYear());

    const endDate = useMemo(
        () => new Date(endYear, endMonth - 1, 1),
        [endYear, endMonth]
    );
    const end = endDate ? new Date(endDate) : new Date();

    const months = useMemo(() => {
        const res: { key: string; label: string; date: Date }[] = [];
        for (let i = monthCount - 1; i >= 0; i--) {
            const d = new Date(end.getFullYear(), end.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            const label = d.toLocaleString(undefined, { month: "short", year: "2-digit" });
            res.push({ key, label, date: d });
        }
        return res;
    }, [monthCount, end]);

    const monthLabels = months.map((m) => m.label);

    const getByMonth = (list: any[], dateFieldCandidates: string[]) => {
        const map = months.reduce<Record<string, number>>((acc, m) => {
            acc[m.key] = 0;
            return acc;
        }, {});
        list.forEach((l: any) => {
            let created: Date | null = null;
            for (const f of dateFieldCandidates) {
                const v = l?.[f];
                if (v != null) {
                    const d = new Date(v);
                    if (!isNaN(d.getTime())) {
                        created = d;
                        break;
                    }
                }
            }
            if (!created) return;
            const key = `${created.getFullYear()}-${created.getMonth()}`;
            if (map[key] != null) map[key] += 1;
        });
        return months.map((m) => map[m.key] ?? 0);
    };

    const publishedEventsByMonth = useMemo(() => {
        return getByMonth(publishedEvents ?? [], ["startTime"]);
    }, [publishedEvents, months]);

    const pendingEventsByMonth = useMemo(() => {
        return getByMonth(pendingEvents ?? [], ["startTime"]);
    }, [pendingEvents, months]);

    const usersByMonth = useMemo(() => {
        return getByMonth(listUserDashBoard ?? [], ["createdAt"]);
    }, [listUserDashBoard, months]);

    useEffect(() => {
        const getDashboardInfo = async () => {
            try {
                showLoadingAlert();
                await dispatch<any>(getAllEventsAdmin());
                await dispatch<any>(getUsers());
                await dispatch<any>(fetchPermissions());
                await dispatch<any>(getCategories());
                closeLoadingAlert();
            } catch (error: any) {
                showErrorAlert("Failed to fetch dashboard informations");
            }
        };

        getDashboardInfo();
    }, [dispatch]);

    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        allEvents.forEach((ev: any) => {
            const s = ev?.status ?? "UNKNOWN";
            counts[s] = (counts[s] || 0) + 1;
        });
        [
            "PUBLISHED",
            "APPROVAL_PENDING",
            "DRAFT",
        ].forEach((k) => {
            if (counts[k] == null) counts[k] = 0;
        });
        return counts;
    }, [allEvents]);

    const categoryCounts = useMemo(() => {
        const map: Record<string, number> = {};
        eventDashBoardList.forEach((ev: any) => {
            const cats = Array.isArray(ev?.categories) ? ev.categories : [];
            cats.forEach((c: any) => {
                const name = c?.name ?? `cat-${c?.id ?? "?"}`;
                map[name] = (map[name] || 0) + 1;
            });
        });
        return Object.entries(map)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
    }, [eventDashBoardList]);
    return {
        numberOfEvents,
        numberOfUsers,
        numberOfPermissions,
        numberOfCategories,
        publishedEventsByMonth,
        pendingEventsByMonth,
        monthLabels,
        usersByMonth,
        endDate: end,
        statusCounts,
        categoryCounts,
        setEndMonth,
        setEndYear,
        setMonthCount,
        monthCount,
        endMonth,
        endYear
    };
};