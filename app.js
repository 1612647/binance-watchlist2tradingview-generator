const fs = require('fs');
const axios = require('axios');

const resultDir = 'examples';
const spotFileName = 'spot.txt';
const futureFileName = 'future.txt';
const spotApi = 'https://api1.binance.com/api/v3/exchangeInfo';
const futureApi = 'https://www.binance.com/fapi/v1/exchangeInfo';

fs.mkdir(resultDir, async function (err) {
  if (err) {  
    console.warn(`Directory ${resultDir} existed!`);
  } else {
    console.log(`Directory ${resultDir} created!`);
  }

  // List all spot pairs
  try {
    const spotFile = fs.createWriteStream(`${resultDir}/${spotFileName}`, {
      flags: 'w'
    });
    const spotPairs = await axios(spotApi);
    for (let index in spotPairs.data.symbols) {
      spotFile.write(`BINANCE:${spotPairs.data.symbols[index].symbol}\n`);
    }
    spotFile.end();
    console.log(`Spot pairs generated!`);
  } catch (error) {
    console.error(error)
  }


  // List all future pairs
  try {
    const futureFile = fs.createWriteStream(`${resultDir}/${futureFileName}`, {
      flags: 'w'
    });
    const futurePairs = await axios(futureApi);
    for (let index in futurePairs.data.symbols) {
      futureFile.write(`BINANCE:${futurePairs.data.symbols[index].symbol}\n`);
    }
    futureFile.end();
    console.log(`Future pairs generated!`);
  } catch (error) {
    console.error(error)    
  }
});
