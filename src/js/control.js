const remote = require('electron').remote;

const closeWindow = () => remote.getCurrentWindow().close();

const minimize = () => remote.getCurrentWindow().minimize();

const openGithub = () => openUrl('https://github.com/IAFEnvoy/HypixelOverlay');

const openGithubHome = () => openUrl('https://github.com/IAFEnvoy');

const openYoutube = () => openUrl('https://www.youtube.com/channel/UCCFkjPNRg6Dhf5cTyTUxTAA');

const openTwitter = () => openUrl('https://twitter.com/IAFEnvoy');

const openBilibili = () => openUrl('https://space.bilibili.com/483982304');
