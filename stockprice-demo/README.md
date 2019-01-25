## Instructions
1. Clone this repository and navigate to this directory in your terminal
2. Install the project directories:
```sh
npm install
```
3. Add a .env file to this directory:
```sh
touch .env
```
3. Get a (free) API key to use for the stockprice API from here: https://www.alphavantage.co/support/#api-key
5. Add your API key from alphavantage to your .env file with the following format:
```javascript
KEY=YOUR_API_KEY
```
6. Run the server:
```sh
npm start
```
7. In the directory that you installed ngrok, run the command to expose your local server:
```sh
./ngrok http 8080
```
8. ngrok will return a public URL that you can specify in your dialogflow console under fulfillment. Make sure to append '/webhook' to the end of the url in order to have dialogflow send webhooks to your API endpoint.
