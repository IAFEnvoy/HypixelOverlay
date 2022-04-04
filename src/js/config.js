const fs = require('fs');

const configPath = './config.json';

let loadConfig = () => {
  if (!fs.existsSync(configPath))
    fs.writeFile(configPath, JSON.stringify({}),function(){});
  return JSON.parse(fs.readFileSync(configPath));
}

let saveConfig = (configData) =>
  fs.writeFile(configPath, JSON.stringify(configData, null, 2),function(){});
