import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useSelector((state: RootState) => state.authReducer.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;