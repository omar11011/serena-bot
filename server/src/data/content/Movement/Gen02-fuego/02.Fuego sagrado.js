module.exports = {
    name: "Fuego sagrado",
    type: "Fuego",
    power: 100,
    precision: 95,
    stateChanges: [
        {
            state: "Quemado",
            prob: 50,
        },
        {
            state: "Descongelado",
            toUser: true,
        },
    ],
    z_move: [
        { power: 180 },
    ],
}