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
    pre_evolution: "Charmeleon",
    evolutions: [
        { form: "Mega Charizard X", type: "mega", item: "Charizardita X" },
        { form: "Mega Charizard Y", type: "mega", item: "Charizardita Y" },
        { form: "Charizard Gigamax", type: "giga" },
    ],
    movements: [
        // Level
        { name: "Tajo aéreo", level: 1 }, { name: "Arañazo", level: 1 }, { name: "Gruñido", level: 1 },
        { name: "Ascuas", level: 1 }, { name: "Pantalla de humo", level: 1 }, { name: "Onda ígnea", level: 1 },
        { name: "Garra dragón", level: 1 }, { name: "Dragoaliento", level: 12 }, { name: "Colmillo ígneo", level: 19 },
        { name: "Cuchillada", level: 24 }, { name: "Lanzallamas", level: 30 }, { name: "Cara susto", level: 39 },
        { name: "Giro fuego", level: 46 }, { name: "Infierno", level: 54 }, { name: "Envite ígneo", level: 62 },          
        // Machine
        ...[
            "Derribo", "Cara susto", "Protección", "Colmillo ígneo", "Acróbata", "Giro fuego", "Imagen", "Golpe aéreo", "Terratemblor",
            "Meteoros", "Tumba rocas", "Nitrocarga", "Aire afilado", "Lanzamiento", "Cola dragón", "Aguante", "Día soleado",
            "Tormenta de arena", "Excavar", "Demolición", "Garra umbría", "Tajo aéreo", "Golpe cuerpo", "Puño fuego", "Puño trueno",
            "Sonámbulo", "Garra dragón", "Descanso", "Avalancha", "Danza espada", "Vuelo", "Danza dragón", "Sustituto", "Fuego fatuo",
            "Triturar", "Pulso dragón", "Onda ígnea", "Lanzallamas", "Refuerzo", "Llamarada", "Voto fuego", "Terremoto", "Gigaimpacto",
            "Anillo ígneo", "Enfado", "Sofoco", "Onda certera", "Vendaval", "Hiperrayo", "Envite ígneo", "Rayo solar", "Teraexplosión",
            "Rugido", "Golpe calor", "Puño certero", "Meteorobola", "Doble filo", "Cólera ardiente", "Arenas ardientes", "Vasto impacto",
            "Bramido dragón",
        ].map(e => {
            return { name: e, category: "maquina" }
        }),
        ...[
            "Lanzallamas", "Anillo ígneo", "Avalancha", "Contraataque", "Danza espada", "Doble filo", "Golpe cuerpo", "Megapatada",
            "Megapuño", "Mimético", "Movimiento sísmico", "Sustituto", "Aguante", "Bofetón lodo", "Contoneo", "Corte furia", "Puño dinámico",
            "Puño fuego", "Rapidez", "Rizo defensa", "Ronquido", "Sonámbulo", "Aire afilado", "Ciclón", "Enfado", "Onda ígnea", "Puño trueno",
            "Viento aciago", "Golpe cabeza", "Viento afín", "Voto fuego", "Cola férrea", "Pulso dragón", "Respiro", "Puño certero",
            "Despejar", "Ala bis", "Arenas ardientes", "Ráfaga escamas",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
        // Special
        { name: "Sísmico", category: "especial" },
    ],
}