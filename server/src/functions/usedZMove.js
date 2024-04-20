module.exports = (user, move, P) => {
    let crystal = move.z_move.find(e => e.pokemon.length > 0 ? e.item === user.pokemon.equippedItem && e.pokemon.includes(e.pokemon.specie) : e.item === user.pokemon.equippedItem)

    if (crystal) {
        P = crystal.power
        user.turn.move = crystal.newName
        user.turn.usedZMove = true
    }

    return P
}