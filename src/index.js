import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createGlobalStyle } from "styled-components";

// Grommet
import { Grommet } from "grommet";

// Components
import App from "./App";

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

const theme = {
	global: {
		font: {
			family: "Roboto",
			size: "14px",
			height: "20px",
		},
	},
};

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Grommet theme={theme} full>
				<GlobalStyle />
				<App />
				<ReactQueryDevtools />
			</Grommet>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
