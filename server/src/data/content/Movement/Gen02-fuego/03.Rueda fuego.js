module.exports = {
    name: "Rueda fuego",
    type: "Fuego",
    power: 60,
    stateChanges: [
        {
            state: "Quemado",
            prob: 10,
        },
        {
            state: "Descongelado",
            toUser: true,
        },
    ],
    z_move: [
        { power: 120 },
    ],
}