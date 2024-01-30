module.exports = {
    name: "Danza lluvia",
    type: "Agua",
    class: "Estado",
    statChanges: [
        {
            stat: "attack",
            points: 1,
            toUser: true,
        },
        {
            stat: "spattack",
            points: 1,
            toUser: true,
        },
        {
            stat: "speed",
            points: 1,
            toUser: true,
        },
    ],
}