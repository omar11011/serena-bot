module.exports = {
    name: "Charizard",
    types: ["Fuego"],
    stats: {
        hp: 78,
        attack: 84,
        defense: 78,
        spattack: 109,
        spdefense: 85,
        speed: 100,
    },
    evolutions: [
        { form: "Mega Charizard X", type: "mega", item: "Charizardita X" },
        { form: "Mega Charizard Y", type: "mega", item: "Charizardita Y" },
        { form: "Charizard Gigamax", type: "giga" },
    ],
    movements: [
        // Level
        { name: "tajo aereo" }, { name: "arañazo" }, { name: "ascuas" },
        { name: "onda ignea" }, { name: "garra dragon" },
        { name: "dragoaliento", level: 12 },
        { name: "colmillo igneo", level: 19 },
        { name: "cuchillada", level: 24 },
        { name: "lanzallamas", level: 30 },
        { name: "giro fuego", level: 46 },
        { name: "infierno", level: 54 },
        { name: "envite igneo", level: 62 },
        // Machine
        ...[
            "derribo", "colmillo igneo", "acrobata", "imagen", "golpe aereo", "terratemblor",
            "tumba rocas", "nitrocarga", "lanzamiento", "cola dragon", "excavar", "demolicion", "garra umbria", "golpe cuerpo", "puño fuego", "puño trueno",
            "garra dragon", "avalancha", "vuelo", "triturar", "terremoto", "gigaimpacto",
            "enfado", "envite igneo", "golpe calor", "puño certero", "doble filo",
            "colera ardiente", "vasto impacto", "giro fuego", "meteoros", "aire afilado",
            "tajo aereo", "pulso dragon", "onda ignea", "lanzallamas", "llamarada",
            "voto fuego", "anillo igneo", "sofoco", "onda certera", "vendaval", "hiperrayo",
            "rayo solar", "teraexplosion", "meteorobola", "arenas ardientes",
        ].map(e => {
            return { name: e, category: "machine" }
        }),
        ...[
            "avalancha", "contraataque", "doble filo", "golpe cuerpo", "megapatada",
            "megapuño", "movimiento sismico", "corte furia", "puño dinamico", "puño fuego",
            "enfado", "puño trueno", "golpe cabeza", "cola ferrea", "puño certero",
            "ala bis", "rafaga escamas", "lanzallamas", "anillo igneo", "bofeton lodo",
            "rapidez", "ronquido", "aire afilado", "ciclon", "onda ignea", "viento aciago",
            "voto fuego", "pulso dragon", "arenas ardientes",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
        // Special
        { name: "sismico", category: "special" },
    ],
}