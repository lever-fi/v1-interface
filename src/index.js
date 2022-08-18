import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as UrqlProvider } from "urql";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import UrqlClient from "utils/UrqlClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<UrqlProvider value={UrqlClient}>
			<App />
			<ToastContainer />
		</UrqlProvider>
	</React.StrictMode>
);
