import { API } from "Components/API";
import { getSession } from "Components/Utils/sessionStorage";

export default function ChangePassword(
  id: string,
  password: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    API.put(
      "users/changePassword/" + id,
      { password: password },
      {
        headers: { Authorization: getSession("token") },
      }
    )
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err));
  });
}
