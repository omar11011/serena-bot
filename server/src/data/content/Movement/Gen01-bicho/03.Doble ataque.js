module.exports = {
    name: "Doble ataque",
    type: "Bicho",
    power: 25,
    hits: 2,
    stateChanges: [
        {
            state: "Envenenado",
            prob: 20,
        },
    ],
    z_move: [
        { power: 100 },
    ],
}