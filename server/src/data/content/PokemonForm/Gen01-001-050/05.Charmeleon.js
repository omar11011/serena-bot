module.exports = {
    name: "Charmeleon",
    types: ["Fuego"],
    stats: {
        hp: 58,
        attack: 64,
        defense: 58,
        spattack: 80,
        spdefense: 65,
        speed: 80,
    },
    evolutions: [
        { form: "Charizard", level: 36 },
    ],
    movements: [
        // Level
        { name: "arañazo" }, { name: "ascuas" },
        { name: "dragoaliento", level: 12 },
        { name: "colmillo igneo", level: 19 },
        { name: "cuchillada", level: 24 },
        { name: "lanzallamas", level: 30 },
        { name: "infierno", level: 48 },
        { name: "envite igneo", level: 54 },
        // Machine
        ...[
            "derribo", "colmillo igneo", "imagen", "tumba rocas", "nitrocarga", "lanzamiento",
            "cola dragon", "excavar", "falso tortazo", "demolicion", "garra umbria",
            "golpe cuerpo", "puño fuego", "puño trueno", "garra dragon", "avalancha",
            "triturar", "enfado", "envite igneo", "puño certero", "colera ardiente",
            "vasto impacto", "giro fuego", "meteoros", "pulso dragon", "onda ignea",
            "lanzallamas", "llamarada", "voto fuego", "sofoco", "onda certera",
            "teraexplosion", "meteorobola",
        ].map(e => {
            return { name: e, category: "machine" }
        }),
        // Tutor
        ...[
            "movimiento sismico", "mega puño", "mega patada", "avalancha", "contraataque",
            "doble filo", "golpe cuerpo", "corte furia", "puño dinamico", "puño fuego",
            "golpe cabeza", "cola ferrea", "enfado", "puño trueno", "puño certero",
            "lanzallamas", "ronquido", "bofeton lodo", "rapidez", "onda ignea", "voto fuego",
            "pulso dragon",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
    ],
}