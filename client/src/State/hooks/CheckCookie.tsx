import { API } from "Components/API";
import { cleanCookie, getCookie } from "Components/Utils/cookieStorage";
import { cleanSession } from "Components/Utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserState } from "State/atom";
import CryptoJS from "crypto-js";

export default function CheckCookie() {
  const navigate = useNavigate();
  const setNewUser = useSetRecoilState(UserState);
  const userEncript = getCookie("user");
  if (userEncript) {
    const userResolve = CryptoJS.AES.decrypt(userEncript, "user").toString(
      CryptoJS.enc.Utf8
    );
    if (userResolve) {
      const auth = JSON.parse(userResolve);
      var tokenResolve = CryptoJS.AES.decrypt(
        auth.tokenEncript,
        auth.user.networkLogin
      ).toString(CryptoJS.enc.Utf8);
      API.get<boolean>("users/auth/isAuthenticated", {
        headers: {
          Authorization: tokenResolve,
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
  }
}
