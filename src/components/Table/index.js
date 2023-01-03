export const Table = ({ headers, rows }) => {
	return (
		<div className="overflow-x-auto">
			<table className="table w-full table-base-100" data-theme="dark">
				<thead>
					<tr>
						{headers.map((header, idx) => (
							<th key={idx}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>{rows.map((row) => row())}</tbody>
			</table>
		</div>
	);
};
