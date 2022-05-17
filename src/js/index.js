let config = null;

window.onload = async () => {
  let games = await getLocalAssets('json/games.json');
  modeList.reduce((p, c) => {
    let root = document.createElement('div');
    root.className = 'dataStyle';
    root.id = c;
    root.addEventListener('click', (e) => { showDetail(e.path[1].id); });
    let name = document.createElement('div');
    name.style.fontSize = '20px';
    name.innerHTML = games.find(it => it.short == c).name;
    let detail = document.createElement('div');
    detail.id = c + 'detail';
    root.appendChild(name);
    root.appendChild(detail);
    p.appendChild(root);
    return p;
  }, document.getElementById('details'));
  config = loadConfig();
  if (config != null)
    document.getElementById('apikey').value = config.apikey;
}

let apikey = null;

const checkValid = async () => {
  if (apikey == '' || apikey == null)
    return 'Please input your API Key in setting!';
  const a = await downloadAssets('https://api.hypixel.net/key?key=' + apikey);
  if (!a.success)
    return a.cause;
  return 'ok';
}

const search = async () => {
  if (!document.getElementById('setapikey').hidden) {
    document.getElementById('playerName').innerHTML = 'Loading...';
    apikey = document.getElementById('apikey').value;

    let valid = await checkValid();
    if (valid != 'ok')
      return alert(valid);

    saveConfig({ apikey: apikey });
    document.getElementById('setapikey').hidden = true;
    document.getElementById('author').hidden = true;
    document.getElementById('result').hidden = false;
  }

  if (!await loadPlayer(document.getElementById('playername').value, apikey))
    return;
  document.getElementById('playerName').innerHTML = getName() + await getGuildTag();
  document.getElementById('skin').src = 'https://crafatar.com/renders/body/' + getUUID() + '?overlay';
  document.getElementById('networkinfo').innerHTML = getData['ov']();
  document.getElementById('guild').innerHTML = await loadGuild();
  document.getElementById('status').innerHTML = await loadStatus();
  document.getElementById('socialMedia').innerHTML = '';
  socialMediaList.reduce((prev, cur) => {
    let link = getSocialMedia(cur);
    if (link != null) {
      let icon = document.createElement('img');
      icon.src = 'img/icons/' + cur.toLowerCase() + '.png';
      icon.style = 'width:70px;height:70px;';
      icon.addEventListener('click', (e) => openUrl(link));
      prev.appendChild(icon);
    }
    return prev;
  }, document.getElementById('socialMedia'));
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
  document.getElementById("background").style.backgroundImage = "url('img/" + (latestmode == "" ? "default" : latestmode) + ".png')";
}

const downloadSkin = async () => {
  let a = document.createElement('a');
  a.href = 'https://crafatar.com/skins/' + getUUID();
  a.download = getUUID() + '.png';
  a.click();
}