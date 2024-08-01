import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Solid 아이콘 패키지
import { far } from "@fortawesome/free-regular-svg-icons"; // Regular 아이콘 패키지
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

library.add(fas, far);
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <GlobalStyle /> */}
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} />{" "} */}
        {/* React Query Devtools 추가 */}
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>
  // </React.StrictMode>
);
serviceWorkerRegistration.register();
reportWebVitals();
