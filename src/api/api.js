import axios from "axios";

export const githubAPI = axios.create({
	baseURL: "https://api.github.com",
});

export const voteAPI = axios.create({
	baseURL: ".netlify/functions",
});
