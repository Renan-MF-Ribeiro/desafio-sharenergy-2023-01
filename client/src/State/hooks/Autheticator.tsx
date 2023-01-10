import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  UsersListState,
  CatsStatus,
  ClientsState,
  UserState,
} from "State/atom";
import GetAllCats from "State/catServices/GetAllCats";
import GetClients from "State/clientServices/GetClients";
import GetAll from "State/userServices/GetAll";
import CryptoJS from "crypto-js";
import { setCookie } from "Components/Utils/cookieStorage";
import { setSession } from "Components/Utils/sessionStorage";
import useCheckAuth from "./useCheckAuth";

export default async function useAuthenticator() {
  useCheckAuth();

  const auth = useRecoilValue(UserState);
  const navigate = useNavigate();
  const usersListState = useSetRecoilState(UsersListState);
  const catsStatus = useSetRecoilState(CatsStatus);
  const clientsState = useSetRecoilState(ClientsState);

  useEffect(() => {
    if (auth.tokenEncript !== "") {
      var tokenResolve = CryptoJS.AES.decrypt(
        auth.tokenEncript,
        auth.user.networkLogin
      ).toString(CryptoJS.enc.Utf8);
      setSession("token", tokenResolve);
      const userEncript = CryptoJS.AES.encrypt(
        JSON.stringify(auth),
        "user"
      ).toString();
      setSession("user", userEncript);
      if (auth.user.remember) {
        setCookie("user", userEncript, 5);
      }

      //setUsers
      GetAll().then(usersListState);
      //setCatList
      GetAllCats().then(catsStatus);
      //setClientsList
      GetClients({ page: 0, results: 10 }).then(clientsState);
      navigate("/home");
    }
  }, [auth,catsStatus,clientsState,navigate,usersListState]);
}
