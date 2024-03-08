module.exports = {
    name: "Chorro de vapor",
    type: "Agua",
    class: "Especial",
    power: 110,
    precision: 95,
    z_move: [
        { power: 185 },
    ],
    stateChanges: [
        {
            state: "Quemado",
            prob: 30,
        },
    ],
}