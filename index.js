import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import 'dotenv/config';
import channel from './channel_manager.js';
import builder from './run_manager.js';
import embed from './embed_manager.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,  GatewayIntentBits.GuildMessageReactions] });
const userChannels = new Map(); // Map<userId, channelId>

// if (msg.author.bot) return;
let wait = [];
let block = false;
let send = false;

client.on('messageCreate', async (msg) => {

    if (msg.author.bot) return;

    // STOP TOOLS
    if (msg.content === '!stop' && msg.member.roles.cache.some((role) => role.id === '1366774569611956378' || role.id === '1366775047628521583')) {
        console.log('BOT IS BEING TERMINATED...');
        process.exit(1);
    }

    // Start character creation
    const allowedCreateChannels = ['1366784180712767518', '1366782882189938688'];
    if (msg.content.startsWith('!create') && !block && allowedCreateChannels.includes(msg.channel.id)){

        if (userChannels.has(msg.author.id)) {
            msg.reply('You already have a private channel!');
            console.log('User (' + msg.author + ') is trying to create second channel');
            return;
        }

        wait.push(msg.id);
        await msg.reply(`THE BUILDER IS CURRENTLY BUSY.\nA Character is being created by ${msg.author}. Please wait until this message disappears before trying to use the bot too.`);
        wait.push(msg.channel);
        wait.push(msg.channel.lastMessageId);
        const privateChannel = await channel.createNew.private(msg.guild, msg.author);
        console.log('A private channel (' + privateChannel + '), has been created for User (' + msg.author.id + ')');
        await userChannels.set(msg.author.id, privateChannel.id);
        await privateChannel.send(`Hello  ${msg.author}, let's create your character! Type "!continue" to continue with your build.`);
        await builder.init(msg.author.id, msg.content, msg);
        await builder.setUser(msg.author.username);
        await builder.setCurrentStep();
        block = true;
        return;

    }

    const userChannelId = userChannels.get(msg.author.id);
    const privateChannel = await msg.guild.channels.fetch(userChannelId);

    if (msg.content === '!continue' && msg.channel.id === userChannelId) {
        
        await builder.continue(privateChannel, msg.author.id);

    }

    if (msg.content === '!delete' && msg.channel.id === userChannels.get(msg.author.id) && msg.member.roles.cache.some((role) => role.id === '1366774569611956378' || role.id === '1366775047628521583')) {
        console.log('PRIVATE CHANNEL IS BEING DELETED AND BUILDER BEING RESET');
        userChannels.delete(msg.author.id);
        await privateChannel.delete(msg.author.id);
        await builder.reset();
        if (wait) {
            try {
                const MESSAGE = await wait[1].messages.fetch(wait[0]); 
                await MESSAGE.delete();  
                const REPLY = await wait[1].messages.fetch(wait[2]); 
                await REPLY.delete();
            } catch (error) {
                console.error('Error fetching or deleting message:', error);
            }
        } else {
            console.error('waitLoc or waitMSG is null, could not delete the message');
        }
        block = false;
        return;

    }

    if (builder.state.currentStep === 3.1 && builder.state.id === msg.author.id) {
        console.log('User (' + msg.author.id + ') is asigning attributes');
        const input = msg.content.trim().toLowerCase();
        const match = input.match(/^!(str|dex|con|int|wis|cha)\s+(\d{1,2})$/);

        if (!match) {
            privateChannel.send("Ungültiger Befehl. Nutze z.B. `!str 1` (nur Kleinbuchstaben).");
            return;
        }

        const stat = match[1];
        const index = parseInt(match[2]) - 1;

        if (builder.util.assignedStats[stat]) {
            privateChannel.send(`${stat} wurde bereits gesetzt.`);
            return;
        }

        // Check if index is valid and not already used
        if (index < 0 || index > 5 || builder.util.remainingStats[index] === null) {
            privateChannel.send(`Index ${index + 1} ist ungültig oder wurde bereits verwendet.`);
            return;
        }

        // Assign value at index
        const value = builder.util.randomStats[index];
        builder.util.assignedStats[stat] = value;
        console.log('User (' + msg.author.id + ') has asigning ' + stat + ' the value ' + value);
        builder.util.remainingStats[index] = null; // Mark as used

        privateChannel.send(`${stat} wurde auf **${value}** gesetzt.`);

        // If done, continue
        if (Object.keys(builder.util.assignedStats).length === 6) {
            Object.assign(builder.results, builder.util.assignedStats);
            console.log('User (' + msg.author.id + ') has assigned all attributes values');
            builder.state.userSteps.set(msg.author.id, 4);
            builder.state.currentStep = 4;
            await embed.delete(builder.state.embedMessage)
            await embed.delete(builder.state.subEmbedMessage)
            privateChannel.send("Alle Werte gesetzt! Weiter geht's...");
            await builder.continue(privateChannel, msg.author.id);

        }
    };

    if (builder.state.currentStep === 8.1 && builder.state.id === msg.author.id) {
        console.log('User (' + msg.author.id + ') is assigning lang');

        const input = msg.content.trim();
        const match = input.match(/^!(Common|Dwarvish|Elvish|Giant|Gnomish|Goblin|Halfling|Orc|Abyssal|Celestia|Draconic|Deep Speech|Infernal|Primordial|Sylvan|Undercommon)$/);

        if (!match) {
            privateChannel.send("Ungültiger Befehl. Nutze z.B. `!Deep_Speech` (mit `!` davor, und auf Groß-/Kleinschreibung achten!).");
            return;
        }

        const lang = match[1]

        // Already assigned
        if (builder.util.assignedLang.includes(lang)) {
            privateChannel.send(`${lang} wurde bereits ausgewählt.`);
            return;
        }

        // Not available
        if (!builder.util.availableLang.includes(lang)) {
            privateChannel.send(`${lang} ist keine verfügbare Sprache.`);
            return;
        }

        builder.util.assignedLang.push(lang); // Add to temp list
        privateChannel.send(`Sprache **${lang}** hinzugefügt.`);

        // If finished assigning all
        if (builder.util.assignedLang.length >= builder.util.amountLang + builder.constant.raceLang.get(builder.results.race).length - 1) {
            builder.results.lang = builder.util.assignedLang;
            console.log('User (' + msg.author.id + ') has assigned all languages:', builder.results.lang);
            builder.state.userSteps.set(msg.author.id, 9); // Next step
            builder.state.currentStep = 9;

            await embed.delete(builder.state.embedMessage);
            privateChannel.send("Alle Sprachen wurden gesetzt! Weiter geht’s...");
            await builder.continue(privateChannel, msg.author.id);
        }
        
    };

    if (builder.state.currentStep === 9.1 && builder.state.id === msg.author.id) {
        console.log('User (' + msg.author.id + ') is assigning skills');

        const input = msg.content.trim();
        const match = input.match(/^!(Acrobatics|Animal Handling|Arcana|Athletics|Deception|History|Insight|Intimidation|Investigation|Medicine|Nature|Perception|Performance|Persuasion|Religion|Sleight of Hand|Stealth|Survival)$/);

        if (!match) {
            privateChannel.send("Ungültiger Befehl. Nutze z.B. `!Acrobatics` (mit `!` davor, und auf Groß-/Kleinschreibung achten!).");
            return;
        }

        const skill = match[1]

        // Already assigned
        if (builder.util.assignedSkills.includes(skill)) {
            privateChannel.send(`${skill} wurde bereits ausgewählt.`);
            return;
        }

        // Not available
        if (!builder.util.availableSkills.includes(skill)) {
            privateChannel.send(`${skill} ist keine verfügbaren Skill.`);
            return;
        }

        await builder.util.assignedSkills.push(skill); // Add to temp list
        privateChannel.send(`**${skill}** hinzugefügt.`);

        // If finished assigning all
        if (builder.util.assignedSkills.length >= builder.util.amountSkills + 1) {
            const binaryString = await builder.skills.map(skill => builder.util.assignedSkills.includes(skill) ? '1' : '0').join('');
            builder.results.skills = binaryString;
            console.log('User (' + msg.author.id + ') has assigned all languages:', builder.results.skills);
            builder.state.userSteps.set(msg.author.id, 11); // Next step
            builder.state.currentStep = 11;

            await embed.delete(builder.state.embedMessage);
            privateChannel.send("Alle Skills wurden gesetzt! Weiter geht’s...");
            await builder.continue(privateChannel, msg.author.id);
        }
        
    };

    if (builder.state.currentStep === 11.1 && !send) {

        const payload = builder.result();
        console.log('Values have been packaged');

        await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        });

        send = true;
        console.log('Values have been pushed to the Google Script(' + process.env.WEBHOOK_URL + ')\n' + JSON.stringify(payload));
        privateChannel.send('Character Sheet created! Await evaluation from staff for the final version.');
        return;

    };

}); 
    

client.login(process.env.DISCORD_TOKEN);