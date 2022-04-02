const shell = require('electron').shell;
const remote = require('electron').remote;
const {
  app,
  BrowserWindow,
  Notification
} = remote;
const fs = require('fs');
const con = remote.getGlobal('console');
const homedir = app.getPath('home');

window.onload = function () {
  apikey = '47243deb-ad0b-45c7-8367-c9320a26f2c4';
  //TODO:config file
}

let uuid = null;
let playerjson = null;

async function checkKey() {

}

async function search() {
  let playername = document.getElementById('playername').value;
  const a = await fetch('https://api.mojang.com/users/profiles/minecraft/' + playername)
    .then(res => res.json());
  uuid = a.id;
  if (uuid == null)
    return alert('player not found');
  const b = await fetch('https://api.hypixel.net/player?key=' + apikey + '&uuid=' + uuid)
    .then(res => res.json());
  if (!b.success)
    return alert(b.cause);
  playerjson = b.player;
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
  document.getElementById('mm').innerHTML = loadMuederMystery(playerjson);
  document.getElementById(document.getElementById('mode').value).hidden = false;
  onShow();
}

function changeDiv() {
  document.getElementById('overview').hidden = true;
  document.getElementById('bedWar').hidden = true;
  document.getElementById('skyWar').hidden = true;
  document.getElementById('guild').hidden = true;
  document.getElementById('status').hidden = true;
  document.getElementById('mm').hidden = true;
  document.getElementById(document.getElementById('mode').value).hidden = false;
  onShow();
}

function closeWindow() {
  remote.getCurrentWindow().close();
}

function minimize() {
  remote.getCurrentWindow().minimize();
}

function onShow() {
  if (uuid == null) return;
  if (!document.getElementById('skyWar').hidden && !document.getElementById('skyWar').innerHTML.includes('Sky War Ranked')) {
    document.getElementById('skyWar').innerHTML += '<br>Sky War Ranked<br>';
    loadSkyWarRanked();
  }
  if (!document.getElementById('guild').hidden)
    loadGuild();
  if (!document.getElementById('status').hidden)
    loadStatus();
}