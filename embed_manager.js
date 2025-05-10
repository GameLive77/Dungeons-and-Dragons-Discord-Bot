import {EmbedBuilder } from 'discord.js';

const embed = {};

embed.createNew = async function (Title, Description, Channel) {

    const  embedObj = new EmbedBuilder()
    .setTitle(Title)
    .setDescription(Description)
    .setColor(0x00AE86);

    const embedMessage = await Channel.send({ embeds: [ embedObj] });
    return embedMessage;

};

embed.AddReact = async function (emojis, id, embedMessage) {

    for (const emoji of emojis) {
        await embedMessage.react(emoji);
    }

    // Await user reaction
    const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === id;
    const collected = await embedMessage.awaitReactions({ filter, max: 1, time: 60000 });

    if (!collected.size) {
        await embedMessage.reply('Du hast nicht rechtzeitig reagiert. Starte erneut mit `!continue`.');
        
        return null;  // Stop the flow
    }

    const chosenEmoji = collected.first()?.emoji.name;
    const index = emojis.indexOf(chosenEmoji);
    return index;

}

embed.delete = async function (embedMessage) {

    console.log('Embedded Message (' + embedMessage + ') is being deleted');
    await embedMessage.delete();
    return;

}

export default embed;