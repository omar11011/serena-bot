module.exports = {
    name: "Colmillo hielo",
    type: "Hielo",
    power: 65,
    stateChanges: [
        {
            state: "congelado",
            prob: 10,
        },
        {
            state: "amedrentado",
            prob: 10,
        },
    ],
    z_move: [
        { power: 120 },
    ],
}