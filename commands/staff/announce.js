const Discord = require('discord.js')

module.exports = {
	name: 'announce',
    description: 'Sends an embed announcment to a given channel',
    args: true,
    usage: '<subcommand> <channel> <message>',
    subcommands: 'announce <channel> - Does not mention anyone\nannounce @everyone <channel> - Mentions everyone\nannounce @here <channel> - Mentions everyone in a channel\nannounce role <@role> <channel> - Mentions everyone of a role\nannounce @user <channel> - Mentions a specific user',
    examples: 'announce #general Hello World\nannounce @everyone #general Hello World\nannounce @here #general Hello World\nannounce role @Member #general Hello World\nannounce @Alex #general Hello Alex',
    aliases: ['embed'],
    userPermissions: ['MANAGE_MESSAGES'],
    guildOnly: true,
	execute(message, args, client) {
        let tag;
        let iStart;
        if (args[0].includes('@')) {
            iStart = 2;
            tag = args[0];
        } else if (args[0] == 'role') {
            tag = args[1];
            iStart = 3;
        } else {
            iStart = 1
        }

        let compiledMessage = [];
        for (i = iStart; i <= args.length - 1; i++) {
            compiledMessage += args[i] + ' '
            if (i == args.length - 1) {
                const embed = new Discord.MessageEmbed()
                .setColor('#3498db')
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(compiledMessage)
                message.guild.channels.cache.get(args[iStart-1].replace(/[^0-9]/g, '')).send(tag, embed)
            }
        }
	},
};