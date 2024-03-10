module.exports = {
    name: "Fuego sagrado",
    type: "Fuego",
    power: 100,
    precision: 95,
    stateChanges: [
        {
            state: "quemado",
            prob: 50,
        },
        {
            state: "descongelado",
            toUser: true,
        },
    ],
    z_move: [
        { power: 180 },
    ],
}