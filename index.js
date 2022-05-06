const ENV = {
    TwitchUsername: 'Cabr0nCoin',
    TwitchPassword: 'sem senha',
    Channels: [ 'sergiocabral_com' ]
}

const WORDS = [
    "incrivel",
    "doideira",
    "loucura",
    "acredito"
]

const PHRASES = [
    "inacreditável, de fato {0}",
    '{0} cê loko',
    'que isso mano',
    'podecrê',
    'LUL LUL LUL LUL'
]

const tmi = require('tmi.js');

var global = {
    /**
     * @type {tmi.Client}
     */
    irc: null
};

async function connectToTwitchChat() {
    const irc = new tmi.Client({
        identity: {
            username: ENV.TwitchUsername,
            password: ENV.TwitchPassword,
        },
        channels: ENV.Channels
    })
    await irc.connect();
    console.log('Twitch Chat connected.');
    return irc;
}

async function onMessage(channel, tags, message, self) {
    if (!self) {
        const matched = WORDS.find(word => message.toLowerCase().includes(word));
        if (matched) {
            const phrase = PHRASES[Math.floor(Math.random() * 1000) % PHRASES.length];
            waitFor = (Math.random() * 10 + 5) * 1000;
            setTimeout(() => global.irc.say(channel, phrase.replace("{0}", `@${tags["display-name"]}`)), waitFor);
        }
    }
}

async function main() {
    global.irc = await connectToTwitchChat();
    global.irc.on('message', onMessage.bind(global));
}

main();