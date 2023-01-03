import ActionButton from "components/ActionButton";
import { ContractWrapper, ModalEntry } from "components/ModalEntry";

const Logs = () => {
	return (
		<>
			<div className="space-y-8">
				<div className="flex justify-between w-full px-4 mt-4">
					<div className="overflow-hidden px-4 mt-4">
						<ContractWrapper
							contracts={[
								{
									title: "BAYC-LFI-LPP (Pool)",
									address:
										"0x7f268357a8c2552623316e2562d90e642bb538e5",
								},
								{
									title: "BAYC-LFI-LPT (Liquidity Token)",
									address:
										"0x7f268357a8c2552623316e2562d90e642bb538e5",
								},
								{
									title: "BAYC-LFI-LPW (Wrapped Collection)",
									address:
										"0x7f268357a8c2552623316e2562d90e642bb538e5",
								},
								{
									title: "BAYC-LFI-LPV (Vault)",
									address:
										"0x7f268357a8c2552623316e2562d90e642bb538e5",
								},
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Logs;
