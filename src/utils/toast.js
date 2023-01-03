import { toast } from "react-toastify";

export const toastNormal = (text, ms = 3000) =>
	toast(text, {
		theme: "dark",
		position: "bottom-right",
		autoClose: ms,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});

export const toastPromise = (promise, options, ms = 3000) =>
	toast.promise(promise, options, {
		theme: "dark",
		position: "bottom-right",
		autoClose: ms,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});
