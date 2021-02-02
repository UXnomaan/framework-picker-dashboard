import React from "react";
import { Box } from "grommet";

const GithubMetric = ({ children, title, ...rest }) => {
	return (
		<Box
			width="small"
			height="xsmall"
			direction="column"
			justify="center"
			align="center"
			gap="small"
			title={title}
			{...rest}
		>
			{children}
		</Box>
	);
};

export default GithubMetric;
