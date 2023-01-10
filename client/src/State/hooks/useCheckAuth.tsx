import { API } from "Components/API";
import { cleanCookie } from "Components/Utils/cookieStorage";
import { getSession, cleanSession } from "Components/Utils/sessionStorage";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserState } from "State/atom";
import CheckCookie from "./CheckCookie";

export default function useCheckAuth() {
  const navigate = useNavigate();
  const setNewUser = useSetRecoilState(UserState);
  const userEncript = getSession("user");
  if (userEncript) {
    const userResolve = CryptoJS.AES.decrypt(userEncript, "user").toString(
      CryptoJS.enc.Utf8
    );
    if (userResolve) {
      const auth = JSON.parse(userResolve);
      API.get<boolean>("users/auth/isAuthenticated", {
        headers: {
          Authorization: getSession("token"),
        },
      }).then((tokenValid) => {
        if (tokenValid) {
          setNewUser(auth);
        } else {
          cleanSession();
          cleanCookie();
          navigate("/", { replace: true });
        }
      });
    } else {
      cleanSession();
      cleanCookie();
      navigate("/", { replace: true });
    }
  } else {
    CheckCookie();
  }
}
