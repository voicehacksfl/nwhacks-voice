const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
const getTickerData = require('../stockprice');

const indexRouter = express.Router();

indexRouter.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();

  async function stockprice() {
    const company = req.body.queryResult.parameters.company;
    const stockprice = await getTickerData(company);
    agent.add(`The current stock price of ${company} is ${stockprice} dollars`);
  }

  intentMap.set('stockprice', stockprice);

  agent.handleRequest(intentMap);
})

module.exports = indexRouter;