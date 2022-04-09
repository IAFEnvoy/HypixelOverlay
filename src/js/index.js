const remote = require('electron').remote;
const { shell } = require('electron');

let config = {};

window.onload = function () {
  config = loadConfig();
  apikey = config.apikey;
  document.getElementById('apiKey').value = config.apikey ?? '';
}

async function checkValid() {
  if (apikey == '' || apikey == null)
    return 'Please input your API Key in setting!';
  const a = await downloadAssets('https://api.hypixel.net/key?key=' + apikey);
  if (!a.success)
    return a.cause;
  return 'ok';
}

async function search() {
  document.getElementById('skin').hidden = true;
  document.getElementById('playerName').innerHTML = 'Loading...';
  document.getElementById('playerInfo').innerHTML = 'Loading...';

  let valid = await checkValid();
  if (valid != 'ok')
    return alert(valid);
  if (!await loadPlayer(document.getElementById('playername').value, apikey))
    return;
  document.getElementById('playerName').innerHTML = getName();
  changeDiv();

  document.getElementById('skin').src = 'https://crafatar.com/renders/body/' + getUUID() + '?overlay';
  document.getElementById('skin').hidden = false;
}

async function changeDiv() {
  if (playerDataJson == null) return;
  let mode = document.getElementById('mode').value;
  switch (mode) {
    case 'overview':
      document.getElementById('playerInfo').innerHTML = loadOverView();
      break;
    case 'guild':
      document.getElementById('playerInfo').innerHTML = 'Loading...';
      document.getElementById('playerInfo').innerHTML = await loadGuild();
      break;
    case 'status':
      document.getElementById('playerInfo').innerHTML = 'Loading...';
      document.getElementById('playerInfo').innerHTML = await loadStatus();
      break;
    case 'bw':
      document.getElementById('playerInfo').innerHTML = loadBedWar();
      break;
    case 'sw':
      document.getElementById('playerInfo').innerHTML = loadSkyWar() + `<br><br>Sky War Ranked<br>`;
      document.getElementById('playerInfo').innerHTML += await loadSkyWarRanked();
      break;
    case 'mm':
      document.getElementById('playerInfo').innerHTML = loadMurderMystery();
      break;
    case 'duel':
      document.getElementById('playerInfo').innerHTML = loadDuel();
      break;
    case 'uhc':
      document.getElementById('playerInfo').innerHTML = loadUHC();
      break;
    case 'mw':
      document.getElementById('playerInfo').innerHTML = loadMegaWall();
      break;
    case 'bb':
      document.getElementById('playerInfo').innerHTML = loadBuildBattle();
      break;
    case 'pit':
      document.getElementById('playerInfo').innerHTML = loadThePit();
      break;
    case 'bsg':
      document.getElementById('playerInfo').innerHTML = loadBlitzSurvivalGames();
      break;
    case 'arcade':
      document.getElementById('playerInfo').innerHTML = loadArcade();
      break;
    default:
      document.getElementById('playerInfo').innerHTML = '';
      break;
  }
}

function closeWindow() {
  remote.getCurrentWindow().close();
}


function minimize() {
  remote.getCurrentWindow().minimize();
}

function openGithub() {
  shell.openExternal('https://github.com/IAFEnvoy/HypixelOverlay');
}

function openGithubHome() {
  shell.openExternal('https://github.com/IAFEnvoy');
}

function openYoutube() {
  shell.openExternal('https://www.youtube.com/channel/UCCFkjPNRg6Dhf5cTyTUxTAA');
}

function openTwitter() {
  shell.openExternal('https://twitter.com/IAFEnvoy');
}

function openBilibili() {
  shell.openExternal('https://space.bilibili.com/483982304');
}

let pageNow = 'playerData';

function openInfo() {
  if (pageNow != 'info')
    pageNow = 'info';
  else pageNow = 'playerData';
  changePage();
}

function openSetting() {
  if (pageNow != 'setting')
    pageNow = 'setting';
  else {
    pageNow = 'playerData';
    config.apikey = document.getElementById('apiKey').value;
    apikey = config.apikey;
    saveConfig(config);
  }
  changePage();
}

function changePage() {
  document.getElementById('playerData').hidden = true;
  document.getElementById('MainBar').hidden = true;
  document.getElementById('infoPage').hidden = true;
  document.getElementById('settingPage').hidden = true;
  if (pageNow == 'playerData') {
    document.getElementById('playerData').hidden = false;
    document.getElementById('MainBar').hidden = false;
  }
  if (pageNow == 'info')
    document.getElementById('infoPage').hidden = false;
  if (pageNow == 'setting')
    document.getElementById('settingPage').hidden = false;
}