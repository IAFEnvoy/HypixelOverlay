const remote = require('electron').remote;
const { shell } = require('electron');

function closeWindow() {
  remote.getCurrentWindow().close();
}

function minimize() {
  remote.getCurrentWindow().minimize();
}

let apikey = null;

async function checkValid() {
  if (apikey == '' || apikey == null)
    return 'Please input your API Key in setting!';
  const a = await downloadAssets('https://api.hypixel.net/key?key=' + apikey);
  if (!a.success)
    return a.cause;
  return 'ok';
}

async function search() {
  // document.getElementById('skin').hidden = true;
  document.getElementById('playerName').innerHTML = 'Loading...';
  apikey = document.getElementById('apikey').value;

  let valid = await checkValid();
  if (valid != 'ok')
    return alert(valid);

  document.getElementById('setapikey').hidden = true;
  document.getElementById('result').hidden = false;

  if (!await loadPlayer(document.getElementById('playername').value, apikey))
    return;
  document.getElementById('playerName').innerHTML = getName() + await getGuildTag();
  document.getElementById('networkinfo').innerHTML = getData['ov']();
  document.getElementById('guild').innerHTML = await loadGuild();
  document.getElementById('status').innerHTML = await loadStatus();
}

let latestmode = "";

const showDetail = (mode) => {
  if (latestmode == mode) {
    document.getElementById(latestmode + 'detail').innerHTML = "";
    latestmode = "";
  } else {
    if (latestmode != "")
      document.getElementById(latestmode + 'detail').innerHTML = "";
    document.getElementById(mode + 'detail').innerHTML = getData[mode]();
    latestmode = mode;
  }
}