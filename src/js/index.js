const remote = require('electron').remote;
const { shell } = require('electron');

window.onload = function () {
  apikey = '47243deb-ad0b-45c7-8367-c9320a26f2c4';
  //TODO:config file
}

let uuid = null;
let playerjson = null;

async function search() {
  clearAll();
  let playername = document.getElementById('playername').value;
  const a = await downloadAssets('https://api.mojang.com/users/profiles/minecraft/' + playername);
  uuid = a.id;
  if (uuid == null)
    return alert('Player Not Found !');
  const b = await downloadAssets('https://api.hypixel.net/player?key=' + apikey + '&uuid=' + uuid);
  if (!b.success)
    return alert(b.cause);
  playerjson = b.player;
  if (playerjson == null)
    return alert('Player Data Not Found !');
  document.getElementById('playerName').innerHTML = formatColor(getRank(playerjson));
  document.getElementById('overview').hidden = true;
  document.getElementById('overview').innerHTML = loadOverView(playerjson);
  document.getElementById('guild').hidden = true;
  document.getElementById('status').hidden = true;
  document.getElementById('bedWar').hidden = true;
  document.getElementById('bedWar').innerHTML = loadBedWar(playerjson).replace('undefined', ' ? ');
  document.getElementById('skyWar').hidden = true;
  document.getElementById('skyWar').innerHTML = loadSkyWar(playerjson);
  document.getElementById('mm').hidden = true;
  document.getElementById('mm').innerHTML = loadMurderMystery(playerjson);
  document.getElementById('duel').hidden = true;
  document.getElementById('duel').innerHTML = loadDuel(playerjson);
  document.getElementById(document.getElementById('mode').value).hidden = false;
  onShow();
  loadSkin();
}

function changeDiv() {
  document.getElementById('overview').hidden = true;
  document.getElementById('bedWar').hidden = true;
  document.getElementById('skyWar').hidden = true;
  document.getElementById('guild').hidden = true;
  document.getElementById('status').hidden = true;
  document.getElementById('mm').hidden = true;
  document.getElementById('duel').hidden = true;
  document.getElementById(document.getElementById('mode').value).hidden = false;
  onShow();
}

function closeWindow() { 
  remote.getCurrentWindow().close(); }


function minimize() { 
  remote.getCurrentWindow().minimize(); 
}

function onShow() {
  if (uuid == null) return;
  if (!document.getElementById('skyWar').hidden && !document.getElementById('skyWar').innerHTML.includes('Sky War Ranked')) {
    document.getElementById('skyWar').innerHTML += '<br>Sky War Ranked<br>';
    loadSkyWarRanked(uuid);
  }
  if (!document.getElementById('guild').hidden)
    loadGuild(uuid);
  if (!document.getElementById('status').hidden)
    loadStatus(uuid);
}

async function loadSkin() {
  document.getElementById('skin').src = 'https://crafatar.com/renders/body/' + uuid + '?overlay';
  document.getElementById('skin').hidden = false;
}

function clearAll() {
  document.getElementById('playerName').innerHTML = 'Loading...';
  document.getElementById('overview').innerHTML = 'Loading...';
  document.getElementById('bedWar').innerHTML = 'Loading...';
  document.getElementById('skyWar').innerHTML = 'Loading...';
  document.getElementById('mm').innerHTML = 'Loading...';
  document.getElementById('duel').innerHTML = 'Loading...';
  document.getElementById('skin').hidden = true;
}

function openInfo(){
  document.getElementById('playerData').hidden ^= true;
  document.getElementById('infoPage').hidden ^= true;
  document.getElementById('MainBar').hidden ^= true;
}

function openGithub(){
  shell.openExternal('https://github.com/IAFEnvoy/HypixelOverlay');
}

function openGithubHome(){
  shell.openExternal('https://github.com/IAFEnvoy');
}

function openYoutube(){
  shell.openExternal('https://www.youtube.com/channel/UCCFkjPNRg6Dhf5cTyTUxTAA');
}

function openTwitter(){
  shell.openExternal('https://twitter.com/IAFEnvoy');
}

function openBilibili(){
  shell.openExternal('https://space.bilibili.com/483982304');
}