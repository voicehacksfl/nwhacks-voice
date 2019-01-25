require('dotenv').config();

const Fuse = require('fuse.js');
const fetch = require('node-fetch');
const companies = require('./companies');

async function getTickerData(companyName) {
  const symbol = await retrieveCompanySymbol(companyName);
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.KEY}`
  const response = await fetch(url);
  const tickerData = await response.json();
  const stockprice = getLatestClosingPrice(tickerData);
  return stockprice;
}

/* use fuzzy match & a lookup to get company symbol from company name */
async function retrieveCompanySymbol(companyName) {
  const options = {
    keys: ['name'],
    id: 'symbol'
  }
  const fuse = new Fuse(companies, options);
  const symbol = await fuse.search(companyName);
  return symbol[0];
}

/* parse the data we want (latest stock price) from our API response */
function getLatestClosingPrice(tickerData) {
  const latestDate = tickerData['Meta Data']['3. Last Refreshed'].split(' ')[0];
  const fullPrice = tickerData['Time Series (Daily)'][latestDate]['4. close'];
  return fullPrice.split('.')[0];
}

module.exports = getTickerData;