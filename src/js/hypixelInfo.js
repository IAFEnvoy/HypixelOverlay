const getRank = (api) => {
  let rank = api.newPackageRank;
  let plus = api.rankPlusColor;
  if (plus !== undefined)
    plus = formatColorFromString(plus);
  else plus = '§c';
  if (api.rank !== undefined) {
    if (api.rank === 'YOUTUBER') return `§c[§fYT§c] ${api.displayname}`;
    else if (api.rank === 'ADMIN') return `§4[ADMIN] ${api.displayname}`;
    else if (api.rank === 'MODERATOR') return `§2[MOD] ${api.displayname}`;
    else if (api.rank === 'HELPER') return `§9[HELP] ${api.displayname}`;
  } else if (rank === 'MVP_PLUS') {
    if (api.monthlyPackageRank === 'NONE' || !api.hasOwnProperty('monthlyPackageRank')) return `§b[MVP${plus}+§b] ${api.displayname}`;
    else return `§6[MVP${plus}++§6] ${api.displayname}`;
  } else if (rank === 'MVP') return `§b[MVP] ${api.displayname}`;
  else if (rank === 'VIP_PLUS') return `§a[VIP§6+§a] ${api.displayname}`;
  else if (rank === 'VIP') return `§a[VIP] ${api.displayname}`;
  else return `§7${api.displayname}`;
}

const getGuildLevel = (exp) => {
  let guildLevelTables = [100000, 150000, 250000, 500000, 750000, 1000000, 1250000, 1500000, 2000000, 2500000, 2500000, 2500000, 2500000, 2500000, 3000000];
  let level = 0;
  for (var i = 0; ; i++) {
    need = i >= guildLevelTables.length ? guildLevelTables[guildLevelTables.length - 1] : guildLevelTables[i];
    exp -= need;
    if (exp < 0) return level + 1 + exp / need;
    else level++;
  }
}

const loadSkyWarRanked = async (uuid) => {
  const b = await downloadAssets('https://api.hypixel.net/player/ranked/skywars?key=' + apikey + '&uuid=' + uuid);
  if (!b.success)
    return document.getElementById('skyWar').innerHTML += b.cause;
  swRankJson = b.result;
  document.getElementById('skyWar').innerHTML += `Score : ${swRankJson.score} (#${swRankJson.position})`;
}

const loadGuild = async (uuid) => {
  document.getElementById('guild').innerHTML = 'Loading...';
  const b = await downloadAssets('https://api.hypixel.net/guild?key=' + apikey + '&player=' + uuid);
  if (!b.success)
    return document.getElementById('guild').innerHTML = b.cause;
  guildJson = b.guild;
  if (guildJson == null)
    return document.getElementById('guild').innerHTML = 'No Guild';
  document.getElementById('guild').innerHTML = `Name : ${guildJson.name}<br>
  Created : ${formatDateTime(guildJson.created)}<br>
  Level : ${getGuildLevel(guildJson.exp).toFixed(2)} | Guild Tag : ${formatColor(formatColorFromString(guildJson.tagColor) + '[' + guildJson.tag + ']')}<br>
  Members : ${guildJson.members.length} | Max Online : ${guildJson.achievements.ONLINE_PLAYERS}<br><br>`;
  let playerGuildJson = null;
  for (var i=0;i<guildJson.members.length;i++) 
    if (guildJson.members[i].uuid == uuid) {
      playerGuildJson = guildJson.members[i];
      break;
    }
  let rankJson=null;
  for (var i=0;i<guildJson.ranks.length;i++) 
    if (guildJson.ranks[i].name == playerGuildJson.rank) {
      rankJson = guildJson.ranks[i];
      break;
    }
  if (playerGuildJson == null) return;
  if (rankJson == null) return;
  document.getElementById('guild').innerHTML+=`Join Time : ${formatDateTime(playerGuildJson.joined)}<br>
  Guild Rank : ${playerGuildJson.rank}<br>
  Guild Tag : ${formatColor(formatColorFromString(guildJson.tagColor) + '[' + rankJson.tag + ']')}<br>
  Priority : ${rankJson.priority}`
}

const loadStatus = async (uuid) => {
  document.getElementById('status').innerHTML = 'Loading...';
  const b = await downloadAssets('https://api.hypixel.net/status?key=' + apikey + '&uuid=' + uuid);
  if (!b.success)
    return document.getElementById('status').innerHTML = b.cause;
  statusJson = b.session;
  if (statusJson.online)
    if (statusJson.map != null)
      document.getElementById('status').innerHTML = `Status : Online<br>Game Type : ${formatNameString(statusJson.gameType)}<br>Mode : ${formatNameString(statusJson.mode)}<br>Map : ${statusJson.map}`;
    else
      document.getElementById('status').innerHTML = `Status : Online<br>Game Type : ${formatNameString(statusJson.gameType)}<br>Mode : ${formatNameString(statusJson.mode)}`;
  else
    document.getElementById('status').innerHTML = `Status : Offline`;
}

const loadOverView = (api) => {
  achievements = api.achievements ?? {};
  return `Level : ${(api.networkExp ?? 0) < 0 ? 1 : (1 - 3.5 + Math.sqrt(12.25 + 0.0008 * (api.networkExp ?? 0))).toFixed(2)}<br>
  Karma : ${api.karma ?? 0}<br>
  Achievement Point :  ${api.achievementPoints ?? 0}<br>
  General Wins : ${achievements.general_wins ?? 0}<br>
  Complete Quest : ${achievements.general_quest_master ?? 0} | Complete Challenge : ${achievements.general_challenger ?? 0}<br>
  General Coins : ${achievements.general_coins ?? 0}<br>
  Language : ${formatNameString(api.userLanguage ?? 'ENGLISH')}<br>
  First Login : ${formatDateTime(api.firstLogin)}<br>
  Last Login : ${formatDateTime(api.lastLogin)}<br> 
  Last Logout : ${formatDateTime(api.lastLogout)}`;
}

const loadBedWar = (api) => {
  achievements = api.achievements ?? {};
  bedwar = api.stats?.Bedwars ?? {};
  return `Level : ${achievements.bedwars_level ?? 0} | Coins : ${bedwar.coins ?? 0}<br>
  Winstreak : ${bedwar.winstreak ?? 0}<br>
  Bed Destroy : ${bedwar.beds_broken_bedwars ?? 0} | Bed Lost : ${bedwar.beds_lost_bedwars ?? 0}<br>
  Win : ${bedwar.wins_bedwars ?? 0} | Loss : ${bedwar.losses_bedwars ?? 0} | W/L : ${((bedwar.wins_bedwars ?? 0) / (bedwar.losses_bedwars ?? 0)).toFixed(2)}<br>
  Kill : ${bedwar.kills_bedwars ?? 0} | Death : ${bedwar.deaths_bedwars ?? 0} | K/D : ${((bedwar.kills_bedwars ?? 0) / (bedwar.deaths_bedwars ?? 0)).toFixed(2)}<br>
  Final Kill : ${bedwar.final_kills_bedwars ?? 0} | Final Death : ${bedwar.final_deaths_bedwars ?? 0} | FKDR : ${((bedwar.final_kills_bedwars ?? 0) / (bedwar.final_deaths_bedwars ?? 0)).toFixed(2)}<br>
  Iron : ${bedwar.iron_resources_collected_bedwars ?? 0} | Gold : ${bedwar.gold_resources_collected_bedwars ?? 0}<br>
  Diamond : ${bedwar.diamond_resources_collected_bedwars ?? 0} | Emerald : ${bedwar.emerald_resources_collected_bedwars ?? 0}`;
}


const loadSkyWar = (api) => {
  skywar = api.stats?.SkyWars ?? {};
  return `Level : ${formatColor(skywar.levelFormatted)} | Soul : ${skywar.souls ?? 0}<br>
  Coins : ${skywar.coins ?? 0} | Assists : ${skywar.assists ?? 0}<br>
  Kills : ${skywar.kills ?? 0} | Deaths : ${skywar.deaths ?? 0} | K/D : ${((skywar.kills ?? 0) / (skywar.deaths ?? 0)).toFixed(2)}<br>
  Wins : ${skywar.wins ?? 0} | Losses : ${skywar.losses ?? 0} | W/L : ${((skywar.wins ?? 0) / (skywar.losses ?? 0)).toFixed(2)}`;
}

const loadMurderMystery = (api) => {
  mm = api.stats?.MurderMystery ?? {};
  return `Coins : ${mm.coins ?? 0} | Gold Collected : ${mm.coins_pickedup ?? 0}<br>
  Murder Chance : ${mm.murderer_chance ?? 0}% | Detective Chance : ${mm.detective_chance ?? 0}%<br>
  Wins : ${mm.wins ?? 0} | Win Rate : ${(100 * (mm.wins ?? 0) / (mm.games ?? 0)).toFixed(2)}%<br>
  Kills : ${mm.kills ?? 0} | Deaths : ${mm.deaths ?? 0}<br>
  Knife Kills : ${mm.knife_kills ?? 0} | Bow Kills : ${mm.bow_kills ?? 0}<br>
  Kills As Murderer : ${mm.kills_as_murderer ?? 0} | Heroes : ${mm.was_hero ?? 0}<br>
  Kills As Infected : ${mm.kills_as_infected ?? 0} | Kills As Survivor : ${mm.kills_as_survivor ?? 0}<br>
  Longest Time Survive : ${mm.longest_time_as_survivor_seconds ?? 0}s | Alpha Chance : ${mm.alpha_chance ?? 0}%`
}

const loadDuel = (api) => {
  duel = api.stats?.Duels ?? {};
  return `Coins : ${duel.coins ?? 0} | Ping Preference : ${duel.pingPreference ?? 0}ms<br>
  Wins : ${duel.wins ?? 0} | Losses : ${duel.losses} | W/L : ${((duel.wins ?? 0) / (duel.losses ?? 0)).toFixed(2)}<br>
  Best Winstreak : ${duel.best_all_modes_winstreak ?? '?'} | Current Winstreak : ${duel.current_winstreak ?? '?'}<br>
  Kills : ${duel.kills ?? 0} | Deaths : ${duel.deaths ?? 0} | K/D : ${((duel.kills ?? 0) / (duel.deaths ?? 0)).toFixed(2)}<br>`
}