module.exports = {
    name: "Doble ataque",
    type: "Bicho",
    power: 25,
    hits: 2,
    stateChanges: [
        {
            state: "envenenado",
            prob: 20,
        },
    ],
    z_move: [
        { power: 100 },
    ],
}