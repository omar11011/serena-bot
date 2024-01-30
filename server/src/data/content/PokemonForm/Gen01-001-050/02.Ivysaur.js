module.exports = {
    name: "Ivysaur",
    types: ["Planta", "Veneno"],
    stats: {
        hp: 60,
        attack: 62,
        defense: 63,
        spattack: 80,
        spdefense: 80,
        speed: 60,
    },
    evolutions: [
        { form: "Venusaur", level: 32 },
    ],
    movements: [
        // Level
        { name: "latigo cepa" },
        { name: "placaje" },
        { name: "hoja afilada", level: 12 },
        { name: "bomba germen", level: 20 },
        { name: "derribo", level: 25 },
        { name: "latigazo", level: 45 },
        { name: "rayo solar", level: 50 },
        // Machine
        ...[
            "derribo", "bomba acida", "abrecaminos", "imagen", "hoja magica", "semilladora",
            "carga toxica", "falso tortazo", "golpe cuerpo", "bomba germen", "hierba lazo",
            "gigadrenado", "energibola", "voto planta", "bomba lodo", "lluevehojas",
            "rayo solar", "teraexplosion", "desarme", "meteorobola", "fitoimpulso",
            "doble filo",
        ].map(e => {
            return { name: e, category: "machine" }
        }),
        ...[
            "doble filo", "golpe cuerpo", "bofeton lodo", "corte furia", "ronquido",
            "bomba germen", "desarme", "golpe cabeza", "voto planta", "atadura",
            "gigadrenado", "fitoimpulso",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
    ],
}