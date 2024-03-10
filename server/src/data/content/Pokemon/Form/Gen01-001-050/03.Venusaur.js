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
    pre_evolution: "Ivysaur",
    evolutions: [
        { form: "Mega Venusaur", type: "mega", item: "Venusaurita" },
        { form: "Venusaur Gigamax", type: "giga" },
    ],
    movements: [
        // Level
        { name: "Tormenta floral" }, { name: "Desarrollo" }, { name: "Danza pétalo" }, { name: "Látigo cepa" }, { name: "Placaje" },
        { name: "Gruñido" }, { name: "Drenadoras", level: 9 }, { name: "Hoja afilada", level: 12 }, { name: "Somnífero", level: 15 },
        { name: "Polvo veneno", level: 15 }, { name: "Bomba germen", level: 20 }, { name: "Derribo", level: 25 },
        { name: "Dulce aroma", level: 30 }, { name: "Síntesis", level: 37 }, { name: "Abatidoras", level: 44 },
        { name: "Latigazo", level: 51 }, { name: "Rayo solar", level: 58 },    
        // Machine
        ...[
            "Derribo", "Encanto", "Cara susto", "Protección", "Bomba ácida", "Abrecaminos", "Imagen", "Terratemblor", "Hoja mágica",
            "Carga tóxica", "Aguante", "Día soleado", "Semilladora", "Falso tortazo", "Golpe cuerpo", "Sonámbulo", "Bomba germen",
            "Hierba lazo", "Puya nociva", "Pataleta", "Descanso", "Danza espada", "Sustituto", "Gigadrenado", "Energibola", "Amnesia",
            "Refuerzo", "Tierra viva", "Campo de hierba", "Voto planta", "Bomba lodo", "Terremoto", "Gigaimpacto", "Planta feroz",
            "Lluevehojas", "Hiperrayo", "Rayo solar", "Teraexplosión", "Rugido", "Tóxico", "Desarme", "Meteorobola", "Fitoimpulso",
            "Doble filo", "Tormenta floral", "Maldición",
        ].map(e => {
            return { name: e, category: "maquina" }
        }),
        ...[
            "Danza espada", "Doble filo", "Golpe cuerpo", "Mimético", "Planta feroz", "Sustituto", "Aguante", "Bofetón lodo", "Contoneo",
            "Corte furia", "Rizo defensa", "Ronquido", "Sonámbulo", "Bomba germen", "Desarme", "Enfado", "Síntesis", "Abatidoras", "Bloqueo",
            "Disparo demora", "Golpe cabeza", "Voto planta", "Atadura", "Gigadrenado", "Pataleta", "Fitoimpulso", "Pulso de campo",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
    ],
}