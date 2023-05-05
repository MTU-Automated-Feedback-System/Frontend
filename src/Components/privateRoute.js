import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

// type Props = {
//     children?: React.ReactNode;
// };

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
