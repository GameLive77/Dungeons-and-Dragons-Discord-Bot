const channel = {};

channel.createNew = {

    private : async function (guild, user) {

        const everyoneRole = guild.roles.everyone;
    
        const newprivate = await guild.channels.create({
          name: `buider-${user.username}`,
          type: 0, // 0 = GUILD_TEXT
          parent: '1366771079825068156',
          permissionOverwrites: [
            {
              id: everyoneRole.id,
              deny: ['ViewChannel'], // Hide from everyone
            },
            {
              id: user.id,
              allow: ['ViewChannel', 'SendMessages'], // Allow the user
            },
            {
              id: guild.members.me.id, // the bot itself
              allow: ['ViewChannel', 'SendMessages', 'AttachFiles'],
            },
          ],
        });
      
        return newprivate;
    }
};

channel.delete = async function (guild, id) {

    const ch = guild.channels.cache.get(id);
    if (ch) await ch.delete();

}

export default channel;