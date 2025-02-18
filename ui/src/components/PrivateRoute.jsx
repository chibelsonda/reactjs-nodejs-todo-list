import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const user = useSelector((state) => state.user.user);

  const isAuthenticated = user && user.authenticated;

  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
};

export default PrivateRoute;
