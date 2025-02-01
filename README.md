# Guide For Installation
1. Clone the Repo
2. Run npm i command in both frontend and server folders
3. Add .env file in both frontend and server folders at root level

## Environment Setup for backend
* Add MONGO_URL=YOUR_MONGO_DB_URL
* Add PORT=DESIRED_PORT_TO_RUN_NODE
* Add TOKEN_KEY=VALID_KEY_FOR_TOKEN_ENCRYPTION
> Example Secret key for jwt Token signing [Example Key](https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it#:~:text=8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb)


## Environment Setup for Frontend
* Add REACT_APP_SERVER_URL=YOUR_SERVER_URL

## Now You are good  to go, Just run npm start in separate terminals at root folders of frontend and server
