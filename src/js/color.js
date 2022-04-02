function getBedwarStarColor(stars) {
    if (stars < 100) return `<span style="color: #AAAAAA;">[${stars}✫]</span>`;
    else if (stars < 200) return `<span style="color: #FFFFFF">[${stars}✫]</span>`;
    else if (stars < 300) return `<span style="color: #FFAA00">[${stars}✫]</span>`;
    else if (stars < 400) return `<span style="color: #55FFFF">[${stars}✫]</span>`;
    else if (stars < 500) return `<span style="color: #00AA00">[${stars}✫]</span>`;
    else if (stars < 600) return `<span style="color: #00AAAA">[${stars}✫]</span>`;
    else if (stars < 700) return `<span style="color: #AA0000">[${stars}✫]</span>`;
    else if (stars < 800) return `<span style="color: #FF55FF">[${stars}✫]</span>`;
    else if (stars < 900) return `<span style="color: #5555FF">[${stars}✫]</span>`;
    else if (stars < 1000) return `<span style="color: #AA00AA">[${stars}✫]</span>`;
    else if (stars < 1100) return `<span style="color: #FF5555">[<span style="color: #FFAA00">1</span><span style="color: #FFFF55">${Math.floor((stars%1000)/100)}</span><span style="color: #55FF55">${Math.floor((stars%100)/10)}</span><span style="color: #55FFFF">${stars%10}</span><span style="color: #FF55FF">✫</span><span style="color: #AA00AA">]</span>`;
    else if (stars < 1200) return `<span style="color: #AAAAAA">[</span><span style="color: #FFFFFF">1${stars%1000}</span><span style="color: #AAAAAA">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 1300) return `<span style="color: #AAAAAA">[</span><span style="color: #FFFF55">1${stars%1000}</span><span style="color: #FFAA00">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 1400) return `<span style="color: #AAAAAA">[</span><span style="color: #55FFFF">1${stars%1000}</span><span style="color: #00AAAA">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 1500) return `<span style="color: #AAAAAA">[</span><span style="color: #55FF55">1${stars%1000}</span><span style="color: #00AA00">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 1600) return `<span style="color: #AAAAAA">[</span><span style="color: #00AAAA">1${stars%1000}</span><span style="color: #5555FF">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 1700) return `<span style="color: #AAAAAA">[</span><span style="color: #FF5555">1${stars%1000}</span><span style="color: #AA0000">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 1800) return `<span style="color: #AAAAAA">[</span><span style="color: #FF55FF">1${stars%1000}</span><span style="color: #AA00AA">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 1900) return `<span style="color: #AAAAAA">[</span><span style="color: #5555FF">1${stars%1000}</span><span style="color: #0000AA">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 2000) return `<span style="color: #AAAAAA">[</span><span style="color: #AA00AA">1${stars%1000}</span><span style="color: #555555">✪</span><span style="color: #AAAAAA">]</span>`;
    else if (stars < 2100) return `<span style="color: #555555">[</span><span style="color: #AAAAAA">2</span><span style="color: #FFFFFF">0${Math.floor((stars%100)/10)}</span><span style="color: #AAAAAA">${stars%10}✪</span><span style="color: #555555">]</span>`
    else if (stars < 2200) return `<span style="color: #FFFFFF">[2</span><span style="color: #FFFF55">1${Math.floor((stars-2100)/10)}</span><span style="color: #FFAA00">${stars%10}⚝]</span>`;
    else if (stars < 2300) return `<span style="color: #FFAA00">[2</span><span style="color: #FFFFFF">2${Math.floor((stars-2200)/10)}</span><span style="color: #55FFFF">${stars%10}</span><span style="color: #00AAAA">⚝]</span>`;
    else if (stars < 2400) return `<span style="color: #AA00AA">[2</span><span style="color: #FF55FF">3${Math.floor((stars-2300)/10)}</span><span style="color: #FFAA00">${stars%10}</span><span style="color: #FFFF55">⚝]</span>`;
    else if (stars < 2500) return `<span style="color: #55FFFF">[2</span><span style="color: #FFFFFF">4${Math.floor((stars-2400)/10)}</span><span style="color: #AAAAAA">${stars%10}⚝</span><span style="color: #555555">]</span>`;
    else if (stars < 2600) return `<span style="color: #FFFFFF">[2</span><span style="color: #55FF55">5${Math.floor((stars-2500)/10)}</span><span style="color: #00AA00">${stars%10}⚝]</span>`;
    else if (stars < 2700) return `<span style="color: #AA0000">[2</span><span style="color: #FF5555">6${Math.floor((stars-2600)/10)}</span><span style="color: #FF55FF">${stars%10}⚝</span><span style="color: #AA00AA">]</span>`;
    else if (stars < 2800) return `<span style="color: #FFFF55">[2</span><span style="color: #FFFFFF">7${Math.floor((stars-2700)/10)}</span><span style="color: #555555">${stars%10}⚝]</span>`;
    else if (stars < 2900) return `<span style="color: #55FF55">[2</span><span style="color: #00AA00">8${Math.floor((stars-2800)/10)}</span><span style="color: #FFAA00">${stars%10}⚝</span><span style="color: #FF5555">]</span>`;
    else if (stars < 3000) return `<span style="color: #55FFFF">[2</span><span style="color: #00AAAA">9${Math.floor((stars-2900)/10)}</span><span style="color: #5555FF">${stars%10}⚝</span><span style="color: #0000AA">]</span>`;
    else return `<span style="color: #FFFF55">[3</span><span style="color: #FFAA00">${Math.floor((stars-3000)/10)}</span><span style="color: #FF5555">${stars%10}⚝</span><span style="color: #AA0000">]</span>`;
}

function getSkyWarStarColor(stars) {
    if (stars < 5) return `<span style="color: #AAAAAA;">[${stars}⚔]</span>`;
    else if (stars < 10) return `<span style="color: #FFFFFF;">[${stars}✙]</span>`;
    else if (stars < 15) return `<span style="color: #FFAA00;">[${stars}❤]</span>`;
    else if (stars < 20) return `<span style="color: #55FFFF;">[${stars}☠]</span>`;
    else if (stars < 25) return `<span style="color: #00AA00;">[${stars}✦]</span>`;
    else if (stars < 30) return `<span style="color: #00AAAA;">[${stars}✌]</span>`;
    else if (stars < 35) return `<span style="color: #AA0000;">[${stars}❦]</span>`;
    else if (stars < 40) return `<span style="color: #FF55FF;">[${stars}✵]</span>`;
    else if (stars < 45) return `<span style="color: #5555FF;">[${stars}❣]</span>`;
    else if (stars < 50) return `<span style="color: #AA00AA;">[${stars}☯]</span>`;
    else if (stars < 60) return `<span style="color: #FF5555;">[${stars}✺]</span>`;
    else return `<span style="color: #FF5555;">[${stars}ಠ_ಠ]</span>`;
}

function getDuelColor(wins) {
    if (wins < 100) return '';
    else if (wins < 120) return `<span style="color: #AAAAAA;">[I]</span>`;
    else if (wins < 140) return `<span style="color: #AAAAAA;">[II]</span>`;
    else if (wins < 160) return `<span style="color: #AAAAAA;">[III]</span>`;
    else if (wins < 180) return `<span style="color: #AAAAAA;">[IV]</span>`;
    else if (wins < 200) return `<span style="color: #AAAAAA;">[V]</span>`;
    else if (wins < 260) return `<span style="color: #FFFFFF;">[I]</span>`;
    else if (wins < 320) return `<span style="color: #FFFFFF;">[II]</span>`;
    else if (wins < 380) return `<span style="color: #FFFFFF;">[III]</span>`;
    else if (wins < 440) return `<span style="color: #FFFFFF;">[IV]</span>`;
    else if (wins < 500) return `<span style="color: #FFFFFF;">[V]</span>`;
    else if (wins < 600) return `<span style="color: #FFAA00;">[I]</span>`;
    else if (wins < 700) return `<span style="color: #FFAA00;">[II]</span>`;
    else if (wins < 800) return `<span style="color: #FFAA00;">[III]</span>`;
    else if (wins < 900) return `<span style="color: #FFAA00;">[IV]</span>`;
    else if (wins < 1000) return `<span style="color: #FFAA00;">[V]</span>`;
    else if (wins < 1200) return `<span style="color: #00AAAA;">[I]</span>`;
    else if (wins < 1400) return `<span style="color: #00AAAA;">[II]</span>`;
    else if (wins < 1600) return `<span style="color: #00AAAA;">[III]</span>`;
    else if (wins < 1800) return `<span style="color: #00AAAA;">[IV]</span>`;
    else if (wins < 2000) return `<span style="color: #00AAAA;">[V]</span>`;
    else if (wins < 2400) return `<span style="color: #00AA00;">[I]</span>`;
    else if (wins < 2800) return `<span style="color: #00AA00;">[II]</span>`;
    else if (wins < 3200) return `<span style="color: #00AA00;">[III]</span>`;
    else if (wins < 3600) return `<span style="color: #00AA00;">[IV]</span>`;
    else if (wins < 4000) return `<span style="color: #00AA00;">[V]</span>`;
    else if (wins < 5200) return `<span style="color: #AA0000;">[I]</span>`;
    else if (wins < 6400) return `<span style="color: #AA0000;">[II]</span>`;
    else if (wins < 7600) return `<span style="color: #AA0000;">[III]</span>`;
    else if (wins < 8800) return `<span style="color: #AA0000;">[IV]</span>`;
    else if (wins < 10000) return `<span style="color: #AA0000;">[V]</span>`;
    else if (wins < 12000) return `<span style="color: #FFFF55;">[I]</span>`;
    else if (wins < 14000) return `<span style="color: #FFFF55;">[II]</span>`;
    else if (wins < 16000) return `<span style="color: #FFFF55;">[III]</span>`;
    else if (wins < 18000) return `<span style="color: #FFFF55;">[IV]</span>`;
    else if (wins < 20000) return `<span style="color: #FFFF55;">[V]</span>`;
    else if (wins < 24000) return `<span style="color: #AA00AA;">[I]</span>`;
    else if (wins < 28000) return `<span style="color: #AA00AA;">[II]</span>`;
    else if (wins < 32000) return `<span style="color: #AA00AA;">[III]</span>`;
    else if (wins < 36000) return `<span style="color: #AA00AA;">[IV]</span>`;
    else if (wins < 40000) return `<span style="color: #AA00AA;">[V]</span>`;
    else if (wins < 44000) return `<span style="color: #AA00AA;">[VI]</span>`;
    else if (wins < 48000) return `<span style="color: #AA00AA;">[VII]</span>`;
    else if (wins < 52000) return `<span style="color: #AA00AA;">[VIII]</span>`;
    else if (wins < 56000) return `<span style="color: #AA00AA;">[IX]</span>`;
    else return `<span style="color: #AA00AA;">[X]</span>`;
}