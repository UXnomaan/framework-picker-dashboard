# LaunchPad Lab Code Challenge

## Technologies 💻

### UI Libraries

- [React](https://reactjs.org/)
- [Grommet](https://v2.grommet.io)
- [Styled Components](https://styled-components.com/)
- [Material Table](https://material-table.com/#/)
- [Axios](https://www.npmjs.com/package/axios)
- [React Query](https://react-query.tanstack.com/)
- [Numeral](http://numeraljs.com/)

### Hosting/API

- [Netlify](https://www.netlify.com/)
- [Netlify Functions](https://www.netlify.com/products/functions/)

### Database

- [FaunaDB](https://fauna.com/)

---

## Walkthrough 🦮

### Hosting/Deployment

The first item that I tackled was bootstrapping the application, and deploying it to Netlify.  I prefer to deploy an application to my hosting provider as soon as I have set it up (in this case Create-React-App.) Doing this ensures that any issues that you have with your deployment environment are minimal on day one, and can be dealt with in an incremental manner.

---

### Design

Since this challenge was not about design, I kept the color branding very simple (using the theme that comes with the component library.)  I decided a masonry layout would be an easy way to display statistics, and a nice way to represent the frameworks.  I kept the voting mechanism simple, and made it a simple form that will submit the choice with an email address.  In addition, I added some error handling in case the users email address had voted already.

---

### UI

I went with a very simple UI that displayed a snapshot of the data on the homepage, but allows the user to drill into the data with a table that allows for sorting and searching of the data.

#### Components

I decided to use the Grommet component library, as it is a simple and flexible system that is built on top of styled-components, a library that I use a lot.  In addition, the Grommet components are meant to be building blocks for more complex components which I figured might come in handy.

#### Data Structure

I went with a simple array of objects for my data structure, that drives the configuration of most of the application.  

```js
{
  name: "NAME_OF_FRAMEWORK",
  display: "NAME_OF_FRAMEWORK_FOR_DISPLAY",
  imgSrc: "IMAGE_URL_OR_LOCAL_FILE",
  repoUrl: "ENDPOINT_OF_REPO (e.g. /repos/angular/angular.js)"
},
```

This way if any additional frameworks needed to be added to the voting system, all the developer would need to do would be to add the proper object to the data structure, and no additional UI changes would be necessary.

#### Client API

For the client side API, I used Axios paired with React Query.  I decided on Axios, as it is a very powerful and flexible API client. It allowed me to generate several instances of the API, where each instance can have different configurations.  I generated two instances, one for the Github endpoints, and another for my serverless functions.  Due to the requirement of not wanting to refresh the application to view fresh data, I decided on React Query as an API wrapper, as you can set a refetch interval within the query configurations.  I set the interval of the application to refresh the data every 60 seconds, which keeps the data fresh.  In addition this gave me a cache of data that I could access when the user wanted to view the details of the framework in the table.

#### Table

The prompt asked for the ability to be able to sort and filter the data.  Recently coming from an analytics background, I decided a table would work best for this.  After doing a bit of searching I found Material Table had a simple enough implementation that would work for my purposes.  I added this in with some data formatting to allow the user to sort based on each metric.  In this component I was able to leverage the React Query cache, and instead of make another potential request to the API, I instead pulled out the most recent cached data and display it in the table.  Since the queries on the front page are run every 60 seconds, the data for the table would be fresh enough to analyze.

---

### Data/API Choices

I am a big fan of serverless functions for their flexibility and scalability, so I decided to leverage the Netlify functions that are available with every Netlify site.  In addition, I wanted to stay lean with the database implementation, so I decided to use SQLite with Sequelize to make it easier to construct a quick model and wire it up to the functions.  I opted for two routes, one for casting votes, and another for retrieving the data and processing it.

Unfortunately, I hit a snag with the first round as it turns out SQLite does not play well with Netlify 😢.

Rather than spin up a server on Digital Ocean, and install SQLite manually I decided to switch database providers.  I always build my database logic with abstraction in mind, just in case I ever change providers so I was able to pivot to a different database fairly quickly.  I had been playing around with FaunaDB recently, and decided to use this as my replacement implementation.  I added a single collection called votes, and two indexes.  One that could look up all votes in a table, and another that would look up entries by email.

---

## Potential App Improvements ⬆️

- Source better images for icons, and add a height/width key to the framework configuration
- Replace Material Table as it is not being worked on anymore
- Roll my own function for Numeral.js formatting on home page.  This library is unecessary for what it provides to this app
- Functional Tests in Cypress
- Unit Tests in Jest
- A mobile version that uses a Carousel for the framework cards, rather than a masonry layout
- Additional desktop styles to accomodate proper wrapping if/when additional frameworks are added to the voting list
- Data visualizations comparing Open/Closed issues over time.
- Add additional props to GithubMetric component so it can be looped through

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
