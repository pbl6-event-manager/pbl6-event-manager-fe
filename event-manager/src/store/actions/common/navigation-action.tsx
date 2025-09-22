export const NAVIGATION_ACTION = {
    SET_CURRENT_PAGE: "navigation/setCurrentPage",
} as const;

export interface SetCurrentPageAction {
    type: typeof NAVIGATION_ACTION.SET_CURRENT_PAGE,
    payload: "overview" | "auth",
}

export type NavigationAction = SetCurrentPageAction;

export const setCurrentPage = (payload: "overview" | "auth"): SetCurrentPageAction => ({
    type: NAVIGATION_ACTION.SET_CURRENT_PAGE,
    payload,
});