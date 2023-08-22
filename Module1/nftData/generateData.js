const fs = require('fs');
const path = require('path');
console.log(__dirname);

for (let i = 0; i < 5; i++) {

  // Creates a JSON object for each NFT
  const json = {
      name: `Hot Token NFT #${i}`,
      description: `Smiley NFT #${i}`,
      image: `https://gateway.pinata.cloud/ipfs/Qmba9kmkLBGpXywRdmoFThFyjF36db1Em3nxijY74kzyUW/${i}.jpg`
  };

  // Writes the JSON object to a file
  fs.writeFileSync(
    path.join(__dirname, 'nftCollection', String(i)),
    JSON.stringify(json)
  );
}
