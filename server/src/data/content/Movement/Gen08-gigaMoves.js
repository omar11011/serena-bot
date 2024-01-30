module.exports = [

    ...["Gigafundido", "Gigatrampa acero"].map(e => {
        return { name: e, type: "Acero" }
    }),
    ...[
        "Gigacañonazo", "Gigadisparo", "Gigaespuma", "Gigagolpe fluido", "Gigatrampa rocas",
    ].map(e => {
        return { name: e, type: "Agua" }
    }),
    ...["Gigaestupor"].map(e => {
        return { name: e, type: "Bicho" }
    }),
    ...["Gigadesgaste"].map(e => {
        return { name: e, type: "Dragón" }
    }),
    ...["Gigadescarga", "Gigatronada"].map(e => {
        return { name: e, type: "Eléctrico" }
    }),
    ...["Gigaaparición"].map(e => {
        return { name: e, type: "Fantasma" }
    }),
    ...["Gigacienfuegos", "Gigaesfera ígnea", "Gigallamarada"].map(e => {
        return { name: e, type: "Fuego" }
    }),
    ...["Gigacastigo", "Gigacolofón"].map(e => {
        return { name: e, type: "Hada" }
    }),
    ...["Gigamelodía"].map(e => {
        return { name: e, type: "Hielo" }
    }),
    ...["Gigapuñición"].map(e => {
        return { name: e, type: "Lucha" }
    }),
    ...["Gigamonedas", "Gigarreciclaje", "Gigaternura"].map(e => {
        return { name: e, type: "Normal" }
    }),
    ...["Gigacorrosión", "Gigalianas", "Giganéctar", "Gigarredoble"].map(e => {
        return { name: e, type: "Planta" }
    }),
    ...["Gigabóveda"].map(e => {
        return { name: e, type: "Psíquico" }
    }),
    ...["Gigarroca ígnea"].map(e => {
        return { name: e, type: "Roca" }
    }),
    ...["Gigagolpe brusco", "Gigasopor"].map(e => {
        return { name: e, type: "Siniestro" }
    }),
    ...["Gigapolvareda"].map(e => {
        return { name: e, type: "Tierra" }
    }),
    ...["Gigapestilencia"].map(e => {
        return { name: e, type: "Veneno" }
    }),
    ...["Gigahuracán"].map(e => {
        return { name: e, type: "Volador" }
    }),

].map(e => {
    e.isGigaMove = true

    return e
})