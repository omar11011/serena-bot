module.exports = {
    name: "Frío acogida",
    type: "Hielo",
    class: "Estado",
    statChanges: [
        {
            stat: "attack",
            points: 1,
            toUser: true,
        },
    ],
    stateChanges: [
        {
            state: "congelado",
            prob: 10,
        },
    ],
}