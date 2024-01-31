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
        { name: "Arañazo", level: 1 }, { name: "Gruñido", level: 1 }, { name: "Ascuas", level: 4 },
        { name: "Pantalla de humo", level: 8 }, { name: "Dragoaliento", level: 12 }, { name: "Colmillo ígneo", level: 17 },
        { name: "Cuchillada", level: 20 }, { name: "Lanzallamas", level: 24 }, { name: "Cara susto", level: 28 },
        { name: "Giro fuego", level: 32 }, { name: "Infierno", level: 36 }, { name: "Envite ígneo", level: 40 },          
        // Machine
        ...[
            "Derribo", "Cara susto", "Protección", "Colmillo ígneo", "Giro fuego", "Imagen", "Garra metal", "Meteoros", "Tumba rocas",
            "Nitrocarga", "Lanzamiento", "Cola dragón", "Aguante", "Día soleado", "Excavar", "Falso tortazo", "Demolición", "Garra umbría",
            "Golpe cuerpo", "Puño fuego", "Puño trueno", "Sonámbulo", "Garra dragón", "Descanso", "Avalancha", "Danza espada", "Danza dragón",
            "Sustituto", "Fuego fatuo", "Triturar", "Pulso dragón", "Onda ígnea", "Lanzallamas", "Refuerzo", "Llamarada", "Voto fuego",
            "Enfado", "Sofoco", "Onda certera", "Envite ígneo", "Teraexplosión", "Rugido", "Puño certero", "Meteorobola", "Cólera ardiente",
            "Vasto impacto",
        ].map(e => {
            return { name: e, category: "maquina" }
        }),
        // Tutor
        ...[
            "Lanzallamas", "Avalancha", "Contraataque", "Danza espada", "Doble filo", "Golpe cuerpo", "Megapuño", "Megapatada", "Mimético",
            "Sísmico", "Sustituto", "Aguante", "Bofetón lodo", "Contoneo", "Corte furia", "Puño dinámico", "Puño fuego", "Rapidez",
            "Rizo defensa", "Ronquido", "Sonámbulo", "Onda ígnea", "Golpe cabeza", "Voto fuego", "Cola férrea", "Enfado", "Puño trueno",
            "Pulso dragón", "Puño certero",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
        // Egg
        ...[
            { "name": "Tambor", "parents": ["Snorlax", "Kommo-o"] },
            { "name": "Poder pasado", "parents": ["Cranidos", "Shieldon", "Tyrunt", "Amaura", "Lapras"] },
            { "name": "Avalancha", "parents": ["Larvitar"] },
            { "name": "Mordisco", "parents": ["Squirtle", "Ekans", "Gyarados", "Snorlax", "Totodile", "Larvitar", "Loudred", "Seviper", "Trapinch", "Bagon", "Turtwig", "Axew", "Druddigon", "Deino", "Tyrunt", "Bergmite", "Noibat", "Chewtle", "Dreepy", "Frigibax"] },
            { "name": "Paliza", "parents": ["Nidoran♂", "Sneasel", "Houndour", "Smeargle"] },
            { "name": "Enfado", "parents": ["Dratini", "Axew", "Druddigon", "Deino", "Goodra", "Drampa", "Jangmo-o"] },
            { "name": "Danza espada", "parents": ["Rhyhorn", "Raticate", "Farfetch'd", "Zangoose", "Absol", "Empoleon", "Lucario", "Smeargle"] },
            { "name": "Danza dragón", "parents": ["Horsea", "Gyarados", "Dratini", "Altaria", "Axew", "Jangmo-o"] },
            { "name": "Triturar", "parents": ["Arbok", "Gyarados", "Snorlax", "Totodile", "Larvitar", "Exploud", "Seviper", "Bagon", "Turtwig", "Garchomp", "Scraggy", "Druddigon", "Deino", "Tyrunt", "Avalugg"] },
            { "name": "Carga dragón", "parents": ["Dratini", "Vibrava", "Gible", "Deino", "Flapple", "Drakloak"] },
            { "name": "Envite ígneo", "parents": ["Charizard", "Marowak de Alola"] },
            { "name": "Garra metal", "parents": ["Aron", "Duraludon"] },
            { "name": "Contraataque", "parents": ["Chewtle"] },
            { "name": "Puño certero", "parents": ["Scraggy"] },
            { "name": "Pulso dragón", "parents": ["Horsea", "Ampharos", "Swablu", "Axew", "Deino", "Skrelp", "Goomy", "Salandit", "Turtonator", "Drampa"] },
            { "name": "Aire afilado", "parents": ["Charizard", "Dragonite", "Swablu", "Tropius", "Salamence"] },
            { "name": "Ataque ala", "parents": ["Noibat", "Flapple"] },
            { "name": "Cola dragón", "parents": ["Dratini", "Vibrava", "Salamence", "Milotic", "Jangmo-o", "Duraludon", "Frigibax"] },
            { "name": "Cola férrea", "parents": ["Goodra de Hisui"] }
        ].map(e => {
            e.category = "huevo"
            return e
        }),
        // Special
        ...[
            "Triturar", "Acróbata", "Falso tortazo", "Anillo ígneo",
        ].map(e => {
            return { name: e, category: "especial" }
        }),
    ],
}