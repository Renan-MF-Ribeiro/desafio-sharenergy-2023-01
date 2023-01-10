import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AlertMessage, AlertState } from "State/atom";

export default function Alert() {
  const msg = useRecoilValue(AlertMessage);
  const setAlert = useSetRecoilState(AlertState);
  useEffect(() => {
    if (msg && msg.type!== "") {
      setAlert(true);
    }
  }, [msg,setAlert]);
}
