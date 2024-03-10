module.exports = {
    name: "Cambio de marcha",
    type: "Acero",
    class: "Estado",
    statChanges: [
        {
            stat: "speed",
            points: 2,
            toUser: true,
        },
        {
            stat: "attack",
            points: 1,
            toUser: true,
        },
    ],
}