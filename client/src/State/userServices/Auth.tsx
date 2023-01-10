import { ILogin } from "types/Login";
import { API } from "Components/API";
import CryptoJS from "crypto-js";
import { IAuthentication } from "types/Authentication";

export default async function Auth(FormLogin: ILogin) {
  return new Promise<IAuthentication>(async (resolve, reject) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        FormLogin.password,
        "pass"
      ).toString();
      FormLogin.password = encrypted;
      API.post("users/auth", FormLogin, { withCredentials: true })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          console.log("err", err);
          reject(err.response.data);
        });
    } catch (err) {
      reject(err);
    }
  });
}
