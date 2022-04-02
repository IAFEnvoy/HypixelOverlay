function getRank(api) {
    let rank = api.newPackageRank;
    //add rankcolor for yts and staff
    let plus = api.rankPlusColor;
    if (plus !== undefined) {
        if (plus === 'RED') plus = '#FF5555';
        else if (plus === 'GOLD') plus = '#FFAA00';
        else if (plus === 'GREEN') plus = '#55FF55';
        else if (plus === 'YELLOW') plus = '#FFFF55';
        else if (plus === 'LIGHT_PURPLE') plus = '#FF55FF';
        else if (plus === 'WHITE') plus = '#FFFFFF';
        else if (plus === 'BLUE') plus = '#5555FF';
        else if (plus === 'DARK_GREEN') plus = '#00AA00';
        else if (plus === 'DARK_RED') plus = '#AA0000';
        else if (plus === 'DARK_AQUA') plus = '#00AAAA';
        else if (plus === 'DARK_PURPLE') plus = '#AA00AA';
        else if (plus === 'DARK_GRAY') plus = '#555555';
        else if (plus === 'BLACK') plus = '#000000';
        else if (plus === 'DARK_BLUE') plus = '#0000AA';
    } else plus = '#FF5555';
    if (api.rank !== undefined) {
        if (api.rank === 'YOUTUBER') return `<span style="color: #FF5555;">[</span><span style="color: #FFFFFF;">YT</span><span style="color: #FF5555;">] ${api.displayname}</span>`;
        else if (api.rank === 'ADMIN') return `<span style="color: #AA0000">[ADMIN] ${api.displayname}</span>`;
        else if (api.rank === 'MODERATOR') return `<span style="color: #00AA00">[MOD] ${api.displayname}</span>`;
        else if (api.rank === 'HELPER') return `<span style="color: #5555FF">[HELP] ${api.displayname}</span>`;
    } else if (rank === 'MVP_PLUS') {
        if (api.monthlyPackageRank === 'NONE' || !api.hasOwnProperty('monthlyPackageRank')) return `<span style="color: #55FFFF;">[MVP</span><span style="color: ${plus}">+</span><span style="color: #55FFFF;">] ${api.displayname}</span>`;
        else return `<span style="color: #FFAA00;">[MVP</span><span style="color: ${plus}">++</span><span style="color: #FFAA00;">] ${api.displayname}</span>`;
    } else if (rank === 'MVP') return `<span style="color: #55FFFF;">[MVP] ${api.displayname}</span>`;
    else if (rank === 'VIP_PLUS') return `<span style="color: #55FF55;">[VIP</span><span style="color: #FFAA00;">+</span><span style="color: #55FF55;">] ${api.displayname}</span>`;
    else if (rank === 'VIP') return `<span style="color: #55FF55;">[VIP] ${api.displayname}</span>`;
    else return `<span style="color: #AAAAAA;">${api.displayname}</span>`;
}

function loadOverView(api) {
    let experience = api.networkExp;
    let level = experience < 0 ? 1 : (1 - 3.5 + Math.sqrt(12.25 + 0.0008 * experience)).toFixed(2);
    let karma = api.karma;
    let achievementPoint = api.achievementPoints;
    let generalWins = api.achievements.general_wins;
    let completeQuest = api.achievements.general_quest_master;
    let completeChallenge = api.achievements.general_challenger;
    let generalCoins = api.achievements.general_coins;
    let language = api.userLanguage;
    let firstLogin = formatDateTime(api.firstLogin);
    let lastLogin = formatDateTime(api.lastLogin);
    let lastLogout = formatDateTime(api.lastLogout);

    return 'Level : ' + level + '<br>' + 'Karma : ' + karma + '<br>' + 'Achievement Point :  ' + achievementPoint + '<br>' +
        'General Wins : ' + generalWins + '<br>' + 'Complete Quest : ' + completeQuest + '<br>' + 'Complete Challenge : ' + completeChallenge + '<br>' +
        'General Coins : ' + generalCoins + '<br>' + 'Language : ' + language + '<br>' + 'First Login : ' + firstLogin + '<br>' + 'Last Login : ' +
        lastLogin + '<br>' + 'Last Logout : ' + lastLogout;
}

function loadBedWar({ achievements, stats: { Bedwars: bedwar } }) {
    let level = achievements.bedwars_level;
    let coins = bedwar.coins;
    let bed_destroy = bedwar.beds_broken_bedwars;
    let bed_lost = bedwar.beds_lost_bedwars;
    let winstreak = bedwar.winstreak;
    let win = bedwar.wins_bedwars;
    let loss = bedwar.losses_bedwars;
    let wl = win / loss;
    let kill = bedwar.kills_bedwars;
    let death = bedwar.deaths_bedwars;
    let kd = kill / death;
    let final_kill = bedwar.final_kills_bedwars;
    let final_death = bedwar.final_deaths_bedwars;
    let fkdr = final_kill / final_death;
    let iron = bedwar.iron_resources_collected_bedwars;
    let gold = bedwar.gold_resources_collected_bedwars;
    let diamond = bedwar.diamond_resources_collected_bedwars;
    let emerald = bedwar.emerald_resources_collected_bedwars;

    return 'Level : ' + level + ' | ' + 'Coins : ' + coins + '<br>' +
        'Winstreak : ' + winstreak + '<br>' +
        'Bed Destroy : ' + bed_destroy + ' | ' + 'Bed Lost : ' + bed_lost + '<br>' +
        'Win : ' + win + ' | ' + 'Loss : ' + loss + ' | ' + 'W/L : ' + wl.toFixed(2) + '<br>' +
        'Kill : ' + kill + ' | ' + 'Death : ' + death + ' | ' + 'K/D : ' + kd.toFixed(2) + '<br>' +
        'Final Kill : ' + final_kill + ' | ' + 'Final Death : ' + final_death + ' | ' + 'FKDR : ' + fkdr.toFixed(2) + '<br>' +
        'Iron : ' + iron + ' | ' + 'Gold : ' + gold + '<br>' +
        'Diamond : ' + diamond + ' | ' + 'Emerald : ' + emerald;
}

function loadSkyWar({ stats: { SkyWars: skywar } }) {
    let levelFormatted = formatColor(skywar.levelFormatted);
    let soul = skywar.souls;
    let coins = skywar.coins;
    let assists = skywar.assists;
    let kills = skywar.kills;
    let deaths = skywar.deaths;
    let kd = kills / deaths;
    let wins = skywar.wins;
    let losses = skywar.losses;
    let wl = wins / losses;
    return 'Level : ' + levelFormatted + ' | ' + 'Soul : ' + soul + '<br>' +
        'Coins : ' + coins + ' | ' + 'Assists : ' + assists + '<br>' +
        'Kills : ' + kills + ' | ' + 'Deaths : ' + deaths + ' | ' + 'K/D : ' + kd.toFixed(2) + '<br>' +
        'Wins : ' + wins + ' | ' + 'Losses : ' + losses + ' | ' + 'W/L : ' + wl.toFixed(2);
}

function loadGuild({ guild: guild }) {

}

function getGuildLevel(exp) {
    let guildLevelTables = [100000, 150000, 250000, 500000, 750000, 1000000, 1250000, 1500000, 2000000, 2500000, 2500000, 2500000, 2500000, 2500000, 3000000];
    let level = 0;
    for (var i = 0;; i++) {
        need = i >= sizeof(guildLevelTables) ? guildLevelTables[sizeof(guildLevelTables) - 1] : guildLevelTables[i];
        exp -= need;
        if (exp < 0) return level + 1 + exp / need;
        else level++;
    }
}