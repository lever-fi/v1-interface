import { Outlet } from "react-router-dom";

import Topbar from "components/Topbar";
import Footer from "components/Footer";

const RootPage = (props) => {
	return (
		<>
			<Topbar {...props} />
			<div className="h-28"></div>
			<Outlet />
			<Footer />
		</>
	);
};

export default RootPage;
