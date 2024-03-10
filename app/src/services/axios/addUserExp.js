const update = require('./update')

module.exports = async (message, xp, user) => {

    let up = (await update({
        url: 'user',
        props: {
            user: user ? user : message.author.id,
            inc: { 'stats.xp': xp },
        },
    })).data
    
    if (up && up.stats.xp > up.stats.level * 100) {
        xp = up.stats.xp - up.stats.level * 100

        await update({
            url: 'user',
            props: {
                user: up.user,
                set: { 'stats.xp': xp },
                inc: { 'stats.level': 1 },
            },
        })

        if (!user) return message.reply(`¡Felicidades! Has alcanzado el nivel *${up.stats.level + 1}*.`)
    }

}