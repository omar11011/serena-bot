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
        { name: "Placaje" }, { name: "Gruñido" }, { name: "Látigo cepa", level: 3 },
        { name: "Desarrollo", level: 6 }, { name: "Drenadoras", level: 9 }, { name: "Hoja afilada", level: 12 },
        { name: "Polvo veneno", level: 15 }, { name: "Somnífero", level: 15 }, { name: "Bomba germen", level: 18 },
        { name: "Derribo", level: 21 }, { name: "Dulce aroma", level: 24 }, { name: "Síntesis", level: 27 },
        { name: "Abatidoras", level: 30 }, { name: "Latigazo", level: 33 }, { name: "Rayo solar", level: 36 },        
        // MT
        ...[
            "Derribo", "Encanto", "Protección", "Bomba ácida", "Abrecaminos", "Imagen", "Hoja mágica", "Carga tóxica", "Aguante",
            "Día soleado", "Semilladora", "Falso tortazo", "Golpe cuerpo", "Sonámbulo", "Bomba germen", "Hierba lazo", "Descanso",
            "Danza espada", "Sustituto", "Gigadrenado", "Energibola", "Refuerzo", "Campo de hierba", "Voto planta", "Bomba lodo",
            "Lluevehojas", "Rayo solar", "Teraexplosión", "Tóxico", "Desarme", "Meteorobola", "Fitoimpulso", "Doble filo", "Maldición",
        ].map(e => {
            return { name: e, category: "maquina" }
        }),
        // Tutor
        ...[
            "Danza espada", "Doble filo", "Golpe cuerpo", "Mimético", "Sustituto", "Aguante", "Bofetón lodo", "Contoneo", "Corte furia",
            "Rizo defensa", "Ronquido", "Sonámbulo", "Bomba germen", "Desarme", "Síntesis", "Abatidoras", "Disparo demora", "Golpe cabeza",
            "Voto planta", "Atadura", "Gigadrenado", "Fitoimpulso",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
        // Egg
        ...[
            { "name": "Viento cortante", "parents": ["Totodile"] },
            { "name": "Pantalla de luz", "parents": ["Pikachu", "Chikorita", "Mareep"] },
            { "name": "Velo sagrado", "parents": ["Lapras", "Chikorita"] },
            { "name": "Cabezazo", "parents": ["Squirtle", "Avalugg"] },
            { "name": "Danza pétalo", "parents": ["Venusaur", "Oddish", "Sunflora", "Roselia", "Meganium", "Cherrim", "Maractus", "Comfey"] },
            { "name": "Encanto", "parents": ["Cottonee", "Tyrunt"] },
            { "name": "Hoja mágica", "parents": ["Bellossom", "Roselia", "Tropius", "Chikorita", "Cherubi", "Comfey"] },
            { "name": "Maldición", "parents": ["Slowpoke", "Slowpoke de Galar", "Turtwig", "Ferroseed", "Phantump", "Bergmite", "Appletun"] },
            { "name": "Silbato", "parents": ["Roselia", "Sunkern", "Snover"] },
            { "name": "Amnesia", "parents": ["Slowpoke", "Snorlax"] },
            { "name": "Adaptación", "parents": ["Lotad", "Seedot", "Amaura"] },
            { "name": "Arraigo", "parents": ["Tangela", "Sunkern", "Roselia", "Cacnea", "Carnivine", "Snover", "Maractus", "Foongus", "Ferroseed", "Phantump", "Fomantis", "Morelull"] },
            { "name": "Lluevehojas", "parents": ["Victreebel", "Exeggutor", "Exeggutor de Alola", "Bellossom", "Sunflora", "Grovyle", "Shiftry", "Tropius", "Turtwig", "Snivy"] },
            { "name": "Residuos", "parents": ["Mudkip"] },
            { "name": "Latigazo", "parents": ["Lickitung", "Tangela", "Carnivine", "Ferrothorn"] },
            { "name": "Gigadrenado", "parents": ["Oddish", "Paras", "Tangela", "Hoppip", "Sunkern", "Treecko", "Shroomish", "Roselia", "Turtwig", "Snivy", "Cottonee", "Maractus", "Foongus"] },
            { "name": "Aguante", "parents": ["Shieldon", "Turtonator"] },
            { "name": "Campo de hierba", "parents": ["Oddish", "Tangela", "Roserade", "Comfey"] },
            { "name": "Tóxico", "parents": ["Oddish", "Roselia", "Salandit"] }
        ].map(e => {
            e.category = "huevo"
            return e
        }),
        // Special
        ...[
            "Poder pasado", "Falso tortazo", "Planta feroz", "Meteorobola",
        ].map(e => {
            return { name: e, category: "especial" }
        }),
    ],
}