module.exports = {
    name: "Rueda fuego",
    type: "Fuego",
    power: 60,
    stateChanges: [
        {
            state: "quemado",
            prob: 10,
        },
        {
            state: "descongelado",
            toUser: true,
        },
    ],
    z_move: [
        { power: 120 },
    ],
}