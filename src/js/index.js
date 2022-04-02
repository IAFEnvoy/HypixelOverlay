const shell = require('electron').shell;
const remote = require('electron').remote;
const { app, BrowserWindow, Notification } = remote;
const fs = require('fs');
const con = remote.getGlobal('console');
const homedir = app.getPath('home');

window.onload = function() {
    apikey = '47243deb-ad0b-45c7-8367-c9320a26f2c4';
    //TODO:config file
}

let uuid = null;
let playerjson = null;
let swRankJson = null;
let guildJson = null;

async function checkKey() {

}

async function search() {
    let playername = document.getElementById('playername').value;
    const a = await fetch('https://api.mojang.com/users/profiles/minecraft/' + playername)
        .then(res => res.json());
    uuid = a.id;
    if (uuid == null)
        return console.error('player not found');
    const b = await fetch('https://api.hypixel.net/player?key=' + apikey + '&uuid=' + uuid)
        .then(res => res.json());
    if (!b.success)
        return console.error(b.cause);
    playerjson = b.player;
    document.getElementById('playerName').innerHTML = getRank(playerjson);
    document.getElementById('overView').hidden = true;
    document.getElementById('overView').innerHTML = loadOverView(playerjson);
    document.getElementById('bedWar').hidden = true;
    document.getElementById('bedWar').innerHTML = loadBedWar(playerjson).replace('undefined', ' ? ');
    document.getElementById('skyWar').hidden = true;
    document.getElementById('skyWar').innerHTML = loadSkyWar(playerjson);
    document.getElementById(document.getElementById('mode').value).hidden = false;
    onShow();
}

function changeDiv() {
    document.getElementById('overView').hidden = true;
    document.getElementById('bedWar').hidden = true;
    document.getElementById('skyWar').hidden = true;
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
    if (!document.getElementById('skyWar').hidden && !document.getElementById('skyWar').innerHTML.includes('Skywar Ranked')) {
        document.getElementById('skyWar').innerHTML += '<br>Sky War Ranked<br>';
        loadSkyWarRanked();
    }
}

async function loadSkyWarRanked() {
    let playername = document.getElementById('playername').value;
    const a = await fetch('https://api.mojang.com/users/profiles/minecraft/' + playername)
        .then(res => res.json());
    uuid = a.id;
    if (uuid == null)
        return console.error('player not found');
    const b = await fetch('https://api.hypixel.net/player/ranked/skywars?key=' + apikey + '&uuid=' + uuid)
        .then(res => res.json());
    if (!b.success)
        document.getElementById('skyWar').innerHTML += b.cause;
    swRankJson = b.result;
    console.log(b);
    let score = swRankJson.score;
    let position = swRankJson.position;
    document.getElementById('skyWar').innerHTML += 'Score : ' + score + ' (#' + position + ')';
}

async function loadGuild() {
    document.getElementById('guild').innerHTML = 'Loading...';
    let playername = document.getElementById('playername').value;
    const a = await fetch('https://api.mojang.com/users/profiles/minecraft/' + playername)
        .then(res => res.json());
    uuid = a.id;
    if (uuid == null)
        return console.error('player not found');
    const b = await fetch('https://api.hypixel.net/guild?key=' + apikey + '&uuid=' + uuid)
        .then(res => res.json());
    if (!b.success)
        document.getElementById('guild').innerHTML = b.cause;
    guildJson = b.guild;
    if (guildJson == null) {
        document.getElementById('guild').innerHTML = 'No Guild';
        return;
    }
    let guildName = guildJson.name;
    let createTime = formatDateTime(guildJson.created);
    let guildLevel = getGuildLevel(guildJson.exp);
}