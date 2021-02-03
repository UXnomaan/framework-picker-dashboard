import React from "react";
import PropTypes from "prop-types";
import { Layer, Box, Heading, Button } from "grommet";

const ConfirmationDialog = ({ onClose, onConfirm, displayName }) => {
	const displayText = displayName
		? `Are you sure you want to vote for ${displayName}`
		: "Are you sure?";

	return (
		<Layer onEsc={onClose}>
			<Box margin="medium">
				<Heading level="4">{displayText}</Heading>
				<Box
					direction="row"
					pad="small"
					justify="end"
					align="center"
					gap="small"
				>
					<Button primary color="status-error" label="No" onClick={onClose} />
					<Button primary color="status-ok" label="Yes" onClick={onConfirm} />
				</Box>
			</Box>
		</Layer>
	);
};

ConfirmationDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	displayName: PropTypes.string,
};

export default ConfirmationDialog;
