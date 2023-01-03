import BannerLogo from "assets/BannerLogo.svg";

import NavElement from "./NavElement";
import Section from "./Section";

const sections = [
	{
		heading: "Resources",
		entries: [
			{
				heading: "Whitepaper",
				href: "google.com",
			},
		],
	},
];

const navElements = [
	{
		name: "What?",
		targetId: "what",
	},
	{
		name: "Roadmap",
		targetId: "roadmap",
	},
	{
		name: "Ecosystem",
		targetId: "ecosystem",
	},
	{
		name: "Documentation",
		to: "",
	},
];

const Footer = () => {
	return (
		<div className="w-full px-12 py-8 bg-[#202020] space-y-4">
			<div className="w-full flex flex-col md:flex-row justify-between">
				<div>
					<div>
						<div>
							<img src={BannerLogo} className="h-8" />
						</div>
						<div>{/* media logos */}</div>
					</div>
					<p className="text-sm font-semibold text-[#C4C4C4]">
						The decentralized BNPL <br />
						protocol for NFTs.
					</p>
				</div>
				<div>
					{sections.map((section, index) => (
						<Section {...section} key={index} />
					))}
				</div>
			</div>

			<div className="w-full flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center space-x-12 hidden md:flex">
					{navElements.map((element, index) => (
						<NavElement {...element} key={index} />
					))}
				</div>

				<div className="text-xs font-semibold text-[#C4C4C4]">
					© Lever Finance. All rights reserved.
				</div>
			</div>
		</div>
	);
};

export default Footer;
