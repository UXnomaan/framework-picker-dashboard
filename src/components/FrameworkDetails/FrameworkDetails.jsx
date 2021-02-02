import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { useQueryClient } from "react-query";

// Styles
import { Wrapper } from "./FrameworkDetails.styles";

// Data
import { frameworks } from "../../data/frameworks";

const columns = [
	{
		title: "Framework",
		field: "name",
		render: rowData => {
			const selectedFramework = frameworks.find(
				framework => framework.name === rowData.name
			);
			return (
				<img
					width="50px"
					height="50px"
					src={selectedFramework.imgSrc}
					alt={rowData.name}
				/>
			);
		},
	},
	{ title: "Stars", field: "stargazers_count" },
	{ title: "Watching", field: "subscribers_count" },
	{ title: "Open Issues", field: "open_issues_count" },
	{ title: "Forks", field: "forks" },
	{
		title: "Created",
		field: "created_at",
		render: rowData => {
			const { created_at } = rowData;
			return new Intl.DateTimeFormat("en-US").format(new Date(created_at));
		},
	},
	{
		title: "Last Updated",
		field: "updated_at",
		render: rowData => {
			const { updated_at } = rowData;
			return new Intl.DateTimeFormat("en-US").format(new Date(updated_at));
		},
	},
];

const FrameworkDetails = () => {
	const queryClient = useQueryClient();
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		const newTableData = [];
		frameworks.forEach(framework => {
			const queryState = queryClient.getQueryState(["github", framework.name]);
			if (queryState) {
				newTableData.push(queryState.data);
			}
		});
		setTableData(newTableData);
	}, [queryClient]);

	return (
		<Wrapper>
			<MaterialTable
				title="Framework Details"
				columns={columns}
				data={tableData}
				options={{
					paging: false,
				}}
			/>
		</Wrapper>
	);
};

export default FrameworkDetails;
