module.exports = {
    name: "Venusaur",
    types: ["Planta", "Veneno"],
    stats: {
        hp: 80,
        attack: 82,
        defense: 83,
        spattack: 100,
        spdefense: 100,
        speed: 80,
    },
    evolutions: [
        { form: "Mega Venusaur", type: "mega", item: "Venusaurita" },
        { form: "Venusaur Gigamax", type: "giga" },
    ],
    movements: [
        // Level
        { name: "tormenta floral" }, { name: "danza petalo" }, { name: "placaje" },
        { name: "latigo cepa" },
        { name: "hoja afilada", level: 12 },
        { name: "bomba germen", level: 20 },
        { name: "derribo", level: 25 },
        { name: "latigazo", level: 51 },
        { name: "rayo solar", level: 58 },
        // Machine
        ...[
            "derribo", "bomba acida", "abrecaminos", "imagen", "terratemblor", "pataleta",
            "hoja magica", "carga toxica", "semilladora", "falso tortazo", "golpe cuerpo",
            "bomba germen", "hierba lazo", "puya nociva", "gigadrenado", "energibola",
            "tierra viva", "voto planta", "bomba lodo", "terremoto", "gigaimpacto",
            "planta feroz", "lluevehojas", "hiperrayo", "rayo solar", "teraexplosion",
            "desarme", "meteorobola", "fitoimpulso", "doble filo", "tormenta floral",
        ].map(e => {
            return { name: e, category: "machine" }
        }),
        ...[
            "doble filo", "golpe cuerpo", "planta feroz", "bofetón lodo", "corte furia",
            "ronquido", "bomba germen", "desarme", "enfado", "golpe cabeza", "atadura",
            "voto planta", "gigadrenado", "pataleta", "fitoimpulso", "pulso de campo",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
    ],
}