import { Outlet } from "react-router-dom";

import Topbar from "components/Topbar";
import Footer from "components/Footer";

const RootPage = (props) => {
	return (
		<div className="min-h-screen overflow-y-auto overflow-x-hidden">
			<Topbar /* {...props} */ />
			<div className="h-16"></div>
			<Outlet {...props} />
			<div className="h-16"></div>
			<Footer />
		</div>
	);
};

export default RootPage;
