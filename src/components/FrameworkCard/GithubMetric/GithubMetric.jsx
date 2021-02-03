import React from "react";
import PropTypes from "prop-types";
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

GithubMetric.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
};

export default GithubMetric;
