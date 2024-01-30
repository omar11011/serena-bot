module.exports = {
    name: "Colmillo hielo",
    type: "Hielo",
    power: 65,
    stateChanges: [
        {
            state: "Congelado",
            prob: 10,
        },
        {
            state: "Amedrentado",
            prob: 10,
        },
    ],
    z_move: [
        { power: 120 },
    ],
}