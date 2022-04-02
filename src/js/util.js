let formatDateTime = function(date) {
    if (date == null) return 'Fail to get';
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1; //注意这个“+1”
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + '   ' + h + ' : ' + minute + ' : ' + second;
};

let formatColor = function(data) {
    if (data == null) return 'Fail to get';
    if (data.indexOf('§') == -1) return data;
    let ret = '';
    let has = false;
    const colors = [
        '#000000', '#0000AA', '#00AA00', '#00AAAA', '#AA0000', '#AA00AA', '#FFAA00', '#AAAAAA',
        '#555555', '#5555FF', '#55FF55', '#55FFFF', '#FF5555', '#FF55FF', '#FFFF55', '#FFFFFF'
    ];
    for (let i = 0; i < data.length; i++)
        if (data.slice(i, i + 1) == '§') {
            if (has) ret += '</span>';
            i++;
            has = true;
            ret += '<span style="color:' + colors[parseInt(data.slice(i, i + 1), 16)] + '">';
        } else ret += data.slice(i, i + 1);
    if (has) ret += '</span>';
    return ret;
}
let formatColorFromString = function(name) {
    name = name.toLowerCase();
    switch (name) {
        case "black":
            return "§0";
        case "dark_blue":
            return "§1";
        case "dark_green":
            return "§2";
        case "dark_aqua":
            return "§3";
        case "dark_red":
            return "§4";
        case "dark_purple":
            return "§5";
        case "gold":
            return "§6";
        case "gray":
            return "§7";
        case "dark_gray":
            return "§8";
        case "blue":
            return "§9";
        case "green":
            return "§a";
        case "aqua":
            return "§b";
        case "red":
            return "§c";
        case "light_purple":
            return "§d";
        case "yellow":
            return "§e";
        case "white":
            return "§f";
        default:
            return "";
    }
}