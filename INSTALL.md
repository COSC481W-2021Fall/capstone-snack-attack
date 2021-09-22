# INSTALL Docuement

In order to set up and run the project you will need to have React, Express.js, and Node.hs installed. At the same time, some Dependencies need to be installed，for example: nodemon, cors, dotenv, bootstrap, axios, mongoose, concurrently, react-router-dom.

## Installing Node.js

You can install Node.js directly on your machine by visiting [Nodejs.org](https://nodejs.org/en/download/) to find a pre-built installer for your platform.

## Installing React

After you download and install Node, start your terminal/command prompt and run
 `$ node -v` and `npm -v` to see which versions you have.

If your version of npm earlier than 5.2.0 then you have to run this command to update it:
`$ npm install -g npm`

Else, you can install your app, after go to your workspace(folder) and run the following command:
`$ npx create-react-app my-app`
The installation process may take a few minutes. After it is done, you should see a folder that appears in your workspace with the name you gave to your app.

## MongoDB Atlas

We use the MongoDB Atlas which is a cloud-hosted server on AWS, Azure and Google Cloud to operate database.

## Express.js

Assuming you’ve already installed Node.js, create a directory to hold your application, and make that your terminal in your working directory.

1. Run `$ npm init` in the terminal
2. Run `$ npm install express --save` "save" for save it in the dependencies list.

## Install Dependencies

### mongoose

First be sure you have MongoDB and Node.js installed.

Next install Mongoose from the command line using npm:

`$ npm install mongoose --save`

### cors

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. This is a Node.js module available through the npm registry. Installation is done using the npm install command:
`$ npm install cors`

### dotenv

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Install:
`npm install dotenv`

### bootstrap

Sleek, intuitive, and powerful front-end framework for faster and easier web development.
`npm install bootstrap`

### axios

Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.
`$ npm install axios`

## Install dev depencies

### nodemon

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. Install:
`$ npm i -D nodemon`
