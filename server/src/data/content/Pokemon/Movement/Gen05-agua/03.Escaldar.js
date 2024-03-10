module.exports = {
    name: "Escaldar",
    type: "Agua",
    class: "Especial",
    power: 80,
    z_move: [
        { power: 160 },
    ],
    stateChanges: [
        {
            state: "Quemado",
            prob: 30,
        },
        {
            state: "Descongelado",
            toUser: true,
        },
    ],
}