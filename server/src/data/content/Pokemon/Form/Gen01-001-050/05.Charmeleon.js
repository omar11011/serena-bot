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
    pre_evolution: "Charmander",
    evolutions: [
        { form: "Charizard", level: 36 },
    ],
    movements: [
        // Level
        { name: "Arañazo", level: 1 }, { name: "Gruñido", level: 1 }, { name: "Ascuas", level: 1 },
        { name: "Pantalla de humo", level: 1 }, { name: "Dragoaliento", level: 12 }, { name: "Colmillo ígneo", level: 19 },
        { name: "Cuchillada", level: 24 }, { name: "Lanzallamas", level: 30 }, { name: "Cara susto", level: 37 },
        { name: "Infierno", level: 48 }, { name: "Envite ígneo", level: 54 },          
        // Machine
        ...[
            "Derribo", "Cara susto", "Protección", "Colmillo ígneo", "Giro fuego", "Imagen", "Meteoros", "Tumba rocas", "Nitrocarga",
            "Lanzamiento", "Cola dragón", "Aguante", "Día soleado", "Excavar", "Falso tortazo", "Demolición", "Garra umbría", "Golpe cuerpo",
            "Puño fuego", "Puño trueno", "Sonámbulo", "Garra dragón", "Descanso", "Avalancha", "Danza espada", "Danza dragón", "Sustituto",
            "Fuego fatuo", "Triturar", "Pulso dragón", "Onda ígnea", "Lanzallamas", "Refuerzo", "Llamarada", "Voto fuego", "Enfado",
            "Sofoco", "Onda certera", "Envite ígneo", "Teraexplosión", "Rugido", "Puño certero", "Meteorobola", "Cólera ardiente",
            "Vasto impacto",
        ].map(e => {
            return { name: e, category: "maquina" }
        }),
        // Tutor
        [
            "Lanzallamas", "Movimiento sísmico", "Mega puño", "Mega patada", "Avalancha", "Contraataque", "Mimético", "Sustituto",
            "Doble filo", "Golpe cuerpo", "Danza espada", "Contoneo", "Corte furia", "Sonámbulo", "Puño dinámico", "Rizo defensa",
            "Ronquido", "Bofetón lodo", "Rapidez", "Aguante", "Puño fuego", "Onda ígnea", "Golpe Cabeza", "Voto fuego", "Cola férrea",
            "Enfado", "Puño trueno", "Pulso dragón", "Puño certero",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
    ],
}