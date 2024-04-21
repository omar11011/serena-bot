module.exports = (duel, finish) => {
    let { user, rival } = duel

    let loser = user.battle.user !== finish.userId ? user : rival

    let E = 50 + Math.ceil(Math.random() * 50)
    let L = loser.pokemon.progress.level
    let C = 1.5
    let xp = Math.round(E * L * C / 7)

    return xp
}