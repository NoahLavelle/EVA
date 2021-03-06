let u = require('../../utils')

module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
    aliases: ['icon', 'pfp'],
    guildOnly: true,
	execute(message, args, client) {
		if (!args.length) sendAvatar('Your Avatar', message.author);
		message.mentions.users.map(user => {
			sendAvatar(`${user.username}'s Avatar`, user);
		});

		function sendAvatar (title, target) {
			message.channel.send(u.imageEmbed(title, '#3498db', target.displayAvatarURL({ dynamic: true })));
		}

	},
};