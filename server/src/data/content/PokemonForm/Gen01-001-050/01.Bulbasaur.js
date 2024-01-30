module.exports = {
    name: "Bulbasaur",
    types: ["Planta", "Veneno"],
    isInitial: true,
    stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spattack: 65,
        spdefense: 65,
        speed: 45,
    },
    evolutions: [
        { form: "Ivysaur", level: 16 },
    ],
    movements: [
        // Level
        { name: "Placaje" },
        { name: "Látigo cepa", level: 3 },
        { name: "Hoja afilada", level: 12 },
        { name: "bomba germen", level: 18 },
        { name: "derribo", level: 21 },
        { name: "latigazo", level: 33 },
        { name: "rayo solar", level: 26 },
        // MT
        ...[
            "derribo", "bomba acida", "abrecaminos", "imagen", "hoja magica",
            "carga toxica", "semilladora", "falso tortazo", "golpe cuerpo",
            "bomba germen", "hierba lazo", "gigadrenado", "energibola", "voto planta",
            "bomba lodo", "lluevehojas", "rayo solar", "teraexplosion", "toxico",
            "desarme", "meteorobola", "fitoimpulso", "doble filo",
        ].map(e => {
            return { name: e, category: "machine" }
        }),
        // Tutor
        ...[
            "doble filo", "golpe cuerpo", "bofeton lodo", "corte furia", "ronquido",
            "bomba germen", "desarme", "golpe cabeza", "voto planta", "atadura",
            "gigadrenado", "fitoimpulso",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
        // Egg
        ...[
            { name: "viento cortante", parents: ["totodile"] },
            { name: "cabezazo", parents: ["squirtle", "avalugg"] },
            { name: "danza petalo", parents: [
                "venusaur", "oddish", "sunflora", "roselia", "meganium", "cherrim",
                "maractus", "comfey",
            ] },
            { name: "hoja magica", parents: [
                "bellosom", "roselia", "troipus", "chikorita", "cherubi", "comfey",
            ] },
            { name: "lluevehojas", parents: [
                "victreebel", "exeggutor", "alolan exeggutor", "bellosom", "sunflora",
                "grovyle", "shiftry", "tropius", "turtwig", "snivy",
            ] },
            { name: "residuos", parents: [ "mudkip", "marshtomp", "swampert" ] },
            { name: "latigazo", parents: [
                "lickitung", "tangela", "carnivine", "ferrothorn",
            ] },
            { name: "gigadrenado", parents: [
                "oddish", "paras", "tangela", "hoppip", "sunkern", "treecko",
                "shroomish", "roselia", "turtwig", "snivy", "cottonee", "maractus",
                "foongus",
            ] },
        ].map(e => {
            e.category = "egg"
            return e
        }),
        // Special
        ...[
            "poder pasado", "falsotortazo", "planta feroz", "meteorobola",
        ].map(e => {
            return { name: e, category: "special" }
        }),
    ],
}