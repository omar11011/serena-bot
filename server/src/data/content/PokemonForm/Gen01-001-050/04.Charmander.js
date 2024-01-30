module.exports = {
    name: "Charmander",
    types: ["Fuego"],
    isInitial: true,
    stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        spattack: 60,
        spdefense: 50,
        speed: 65,
    },
    evolutions: [
        { form: "Charmeleon", level: 16 },
    ],
    movements: [
        // Level
        { name: "arañazo" },
        { name: "ascuas", level: 4 },
        { name: "dragoaliento", level: 12 },
        { name: "colmillo igneo", level: 17 },
        { name: "cuchillada", level: 20 },
        { name: "lanzallamas", level: 24 },
        { name: "giro fuego", level: 32 },
        { name: "infierno", level: 36 },
        { name: "envite igneo", level: 40 },
        // Machine
        ...[
            "derribo", "colmillo igneo", "giro fuego", "imagen", "garrametal", "meteoros",
            "tumba rocas", "nitrocarga", "lanzamiento", "cola dragon", "excavar",
            "falso tortazo", "demolicion", "garra umbria", "golpe cuerpo", "puño fuego",
            "puño trueno", "garra dragon", "avalancha", "triturar", "pulso dragon",
            "onda ignea", "lanzallamas", "llamarada", "voto fuego", "enfado", "sofoco",
            "onda certera", "envite igneo", "teraexplosion", "puño certero", "meteorobola",
            "colera ardiente", "vasto impacto",
        ].map(e => {
            return { name: e, category: "machine" }
        }),
        // Tutor
        ...[
            "lanzallamas", "avalancha", "contraataque", "doble filo", "golpe cuerpo",
            "megapuño", "megapatada", "sismico", "bofeton lodo", "corte furia", "puño dinamico",
            "puño fuego", "rapidez", "ronquido", "onda ignea", "golpe cabeza", "voto fuego",
            "cola ferrea", "enfado", "puño trueno", "pulso dragon", "puño certero",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
        // Egg
        { name: "poder pasado", parents: [
            "cranidos", "shieldon", "tyrunt", "amaura", "lapras",
        ] },
        { name: "avalancha", parents: ["larvitar"] },
        { name: "mordisco", parents: [
            "squirtle", "ekans", "gyarados", "snorlax", "totodile", "larvitar", "loudred",
            "seviper", "trapinch", "bagon", "turtwig", "axew", "druddigon", "deino",
            "tyrunt", "bergmite", "noibat", "chewtle", "dreepy", "frigibay",
        ] },
        { name: "paliza", parents: [ "nidoran♂", "sneasel", "houndour", "smeargle" ] },
        { name: "enfado", parents: [
            "dratini", "axew", "druddigon", "deino", "goodra", "drampa", "jangmo-o",
        ] },
        { name: "triturar", parents: [
            "dratini", "vibrava", "gible", "deino", "flapple", "drakloak",
        ] },
        { name: "envite igneo", parents: ["charizard", "alolan marowak"] },
        { name: "garra metal", parents: ["aron", "duraludon"] },
        { name: "contraataque", parents: ["chewtle"] },
        { name: "puño certero", parents: ["scraggy"] },
        { name: "pulso dragon", parents: [
            "horsea", "ampharos", "swablu", "axew", "deino", "skrelp", "goomy", "salandit",
            "turtonator", "drampa",
        ] },
        { name: "aire afilado", parents: [
            "charizard", "dragonite", "swablu", "tropius", "salamence",
        ] },
        { name: "ataque ala", parents: ["noibat", "flapple"] },
        { name: "cola dragon", parents: [
            "dratini", "vibrava", "salamence", "milotic", "jangmo-o", "duraludon", "frigibax",
        ] },
        { name: "cola ferrea", parents: ["hisui goodra"] },
        // Special
        ...[
            "triturar", "acrobata", "falso tortazo", "anillo igneo",
        ].map(e => {
            return { name: e, category: "special" }
        }),
    ],
}