import React, { useState, useEffect } from "react";
import * as numeral from "numeral";

// Grommet
import { Card, CardBody, CardHeader, Heading, Box, Image } from "grommet";
import { Star, View, Archive } from "grommet-icons";

// Components
import GithubMetric from "./GithubMetric/GithubMetric";

// Queries
import { useRepo } from "../../api/queries";

const FrameworkCard = ({ display, name, imgSrc, repoUrl }) => {
	const { data } = useRepo({ name, repoUrl });
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
		</Card>
	);
};

const memoizedFrameworkCard = React.memo(FrameworkCard);

export default memoizedFrameworkCard;
