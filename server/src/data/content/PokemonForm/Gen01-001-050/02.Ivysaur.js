module.exports = {
    name: "Ivysaur",
    types: ["Planta", "Veneno"],
    stats: {
        hp: 60,
        attack: 62,
        defense: 63,
        spattack: 80,
        spdefense: 80,
        speed: 60,
    },
    pre_evolution: "Bulbasaur",
    evolutions: [
        { form: "Venusaur", level: 32 },
    ],
    movements: [
        // Level
        { name: "Látigo cepa" }, { name: "Placaje" }, { name: "Gruñido" },
        { name: "Desarrollo" }, { name: "Drenadoras", level: 9 }, { name: "Hoja afilada", level: 12 },
        { name: "Polvo veneno", level: 15 }, { name: "Somnífero", level: 15 }, { name: "Bomba germen", level: 20 },
        { name: "Derribo", level: 25 }, { name: "Dulce aroma", level: 30 }, { name: "Síntesis", level: 35 },
        { name: "Abatidoras", level: 40 }, { name: "Latigazo", level: 45 }, { name: "Rayo solar", level: 50 },
        // Machine
        ...[
            "Derribo", "Encanto", "Protección", "Bomba ácida", "Abrecaminos", "Imagen", "Hoja mágica", "Carga tóxica", "Aguante",
            "Día soleado", "Semilladora", "Falso tortazo", "Golpe cuerpo", "Sonámbulo", "Bomba germen", "Hierba lazo", "Descanso",
            "Danza espada", "Sustituto", "Gigadrenado", "Energibola", "Refuerzo", "Campo de hierba", "Voto planta", "Bomba lodo",
            "Lluevehojas", "Rayo solar", "Teraexplosión", "Rugido", "Tóxico", "Desarme", "Meteorobola", "Fitoimpulso", "Doble filo",
            "Maldición",
        ].map(e => {
            return { name: e, category: "maquina" }
        }),
        ...[
            "Danza espada", "Doble filo", "Golpe cuerpo", "Mimético", "Sustituto", "Aguante", "Bofetón lodo", "Contoneo", "Corte furia",
            "Rizo defensa", "Ronquido", "Sonámbulo", "Bomba germen", "Desarme", "Síntesis", "Abatidoras", "Disparo demora", "Golpe cabeza",
            "Voto planta", "Atadura", "Gigadrenado", "Fitoimpulso",
        ].map(e => {
            return { name: e, category: "tutor" }
        }),
    ],
}