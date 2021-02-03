// Data
import { frameworks } from "../../data/frameworks";

const formatNumbers = (rowData, key) => {
	const value = rowData[key];
	return new Intl.NumberFormat().format(value);
};

export const columns = [
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
	{
		title: "Stars",
		field: "stargazers_count",
		render: rowData => formatNumbers(rowData, "stargazers_count"),
	},
	{
		title: "Watching",
		field: "subscribers_count",
		render: rowData => formatNumbers(rowData, "subscribers_count"),
	},
	{
		title: "Open Issues",
		field: "open_issues_count",
		render: rowData => formatNumbers(rowData, "open_issues_count"),
	},
	{
		title: "Forks",
		field: "forks",
		render: rowData => formatNumbers(rowData, "forks"),
	},
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
