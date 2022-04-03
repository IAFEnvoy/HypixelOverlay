let formatDateTime = (date) => {
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

let formatColor = (data) => {
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

const colorMap = Object.fromEntries([
  'black', 'dark_blue', 'dark_green', 'dark_aqua', 'dark_red', 'dark_purple', 'gold', 'gray',
  'dark_gray', 'blue', 'green', 'aqua', 'red', 'light_purple', 'yellow', 'white'
].map((c, i) => [c, "§" + i.toString(16)]))
let formatColorFromString = (name) => colorMap[name.toLowerCase()];

let formatNameString = (name) => {
  var words = name.toLowerCase().split('_');
  for (var i = 0; i < words.length; i++)
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  return words.join(' ');
}

let downloadAssets = async (url) => {
  try {
    return await fetch(url).then(res => res.json());
  } catch (error) {
    return {};
  }
}
