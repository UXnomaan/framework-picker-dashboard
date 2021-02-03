import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import numeral from "numeral";

// Grommet
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Heading,
	Box,
	Image,
	Button,
} from "grommet";
import { Star, View, Archive } from "grommet-icons";

// Components
import GithubMetric from "./GithubMetric/GithubMetric";

// Queries
import { useRepo } from "../../api/queries";
import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog";

const FrameworkCard = ({ display, name, imgSrc, repoUrl }) => {
	const { data } = useRepo({ name, repoUrl });
	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
	const [cardData, setCardData] = useState({
		subscribers_count: 0,
		stargazers_count: 0,
		open_issues_count: 0,
	});

	useEffect(() => {
		if (data) {
			const { subscribers_count, stargazers_count, open_issues_count } = data;
			setCardData({
				stargazers_count,
				subscribers_count,
				open_issues_count,
			});
		}
	}, [data, name]);

	return (
		<Card height="medium" width="medium" background="light-1">
			<CardHeader pad="medium" justify="between" gap="10px">
				<Heading level="2">{display}</Heading>
				<Box height="xsmall" width="xsmall">
					<Image fit="cover" src={imgSrc} />
				</Box>
			</CardHeader>
			<CardBody pad="medium" direction="row" align="center">
				<GithubMetric title="Number of Github stars">
					<Star />{" "}
					<span>{numeral(cardData.stargazers_count).format("Oa")}</span>
				</GithubMetric>
				<GithubMetric
					title="Number of people watching the repo"
					border={[
						{ size: "small", side: "right" },
						{ size: "small", side: "left" },
					]}
				>
					<View />{" "}
					<span>{numeral(cardData.subscribers_count).format("Oa")}</span>
				</GithubMetric>
				<GithubMetric title="Number of open issues and pull requests">
					<Archive />{" "}
					<span>{numeral(cardData.open_issues_count).format("Oa")}</span>
				</GithubMetric>
			</CardBody>
			<CardFooter pad="small" justify="end" background="light-2">
				<Button
					primary
					hoverIndicator
					label="Vote"
					onClick={() => setShowConfirmationDialog(true)}
				/>
			</CardFooter>
			{showConfirmationDialog ? (
				<ConfirmationDialog
					displayName={display}
					onConfirm={() => console.log("Voting Not Implemented yet")}
					onClose={() => setShowConfirmationDialog(false)}
				/>
			) : null}
		</Card>
	);
};

FrameworkCard.propTypes = {
	display: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	imgSrc: PropTypes.string.isRequired,
	repoUrl: PropTypes.string.isRequired,
};

const memoizedFrameworkCard = React.memo(FrameworkCard);

export default memoizedFrameworkCard;
