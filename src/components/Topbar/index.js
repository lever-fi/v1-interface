import NavElement from "./NavElement";
import Logo from "assets/Logo.png";

const NavElementList = [
	{
		name: "Pools",
		to: "/pools",
	},
];

const Topbar = ({}) => {
	return (
		<div className="w-screen h-24 flex items-center justify-between px-12 py-4">
			<div className="w-36 h-full flex items-center">
				<img className="h-10" src={Logo} />
			</div>
			<div className="w-full h-full flex justify-center items-center space-x-4">
				{NavElementList.map((navElement, index) => {
					return <NavElement {...navElement} key={index} />;
				})}
			</div>
			<div className="w-36 h-full">{/* Connect */}</div>
		</div>
	);
};

export default Topbar;
