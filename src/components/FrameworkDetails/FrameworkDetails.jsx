import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { useQueryClient } from "react-query";

// Columns
import { columns } from "./columnConfig";

// Data
import { frameworks } from "../../data/frameworks";

// Styles
import { Wrapper } from "./FrameworkDetails.styles";

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
