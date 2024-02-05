const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "pbuy",
    alias: ["buyp"],
    description: "Compra un Pokémon del mercado.",
    cooldown: 4,
    args: ['id'],
	async execute(message, props) {
        let id = props.args[0]
        let embed = { message, data: { color: 'red' } }
        let data = (await axios.get({ url: `capture/${id}` })).data
        
        if (!data) return message.react('🧐')
        if (!data.marketPrice) {
            embed.data.description = `Este Pokémon no se encuentra a la venta.`
            return createEmbed(embed)
        }
        if (data.user === message.author.id) {
            embed.data.description = `No puedes comprar tu propio Pokémon.`
            return createEmbed(embed)
        }

        let buyer = (await axios.create({
            url: 'user',
            props: { user: message.author.id },
        })).data
        
        if (buyer.balance.money < data.marketPrice) {
            embed.data.description = `No cuentas con suficiente dinero para comprar este Pokémon, su precio es de **${data.marketPrice} Pokémonedas**.`
            return createEmbed(embed)
        }

        await axios.update({
            url: 'user/balance',
            props: {
                user: message.author.id,
                'balance.money': -data.marketPrice,
            },
        })

        await axios.update({
            url: 'user/balance',
            props: {
                user: data.user,
                'balance.money': data.marketPrice,
            },
        })

        await axios.update({
            url: 'capture',
            props: {
                id: data.id,
                user: message.author.id,
                'pokemon.alias': null,
                select: false,
                favorite: false,
                marketPrice: null
            },
        })

        embed.data.color = 'green'
        embed.data.description = `¡Has comprado a **${data.pokemon.name}**!`

        return createEmbed(embed)
	},
})