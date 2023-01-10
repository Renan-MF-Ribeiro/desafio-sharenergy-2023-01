import React,{Suspense} from "react";
import ReactDOM from "react-dom";
import AppRouter from "Routes";
import "normalize.css";
import "./index.css";
import { RecoilRoot } from "recoil";



ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <Suspense fallback="Loading...">
      <AppRouter />
      
    </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
