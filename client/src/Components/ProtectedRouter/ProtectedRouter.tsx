import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "State/atom";
type props = {
  children?: JSX.Element;
};

export const ProtectedRoute = ({ children }: props) => {
  const { tokenEncript } = useRecoilValue(UserState);
  if (!tokenEncript) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children!;
};
