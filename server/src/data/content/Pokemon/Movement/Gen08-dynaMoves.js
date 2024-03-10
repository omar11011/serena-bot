module.exports = [

    ...["Maximetal"].map(e => {
        return { name: e, type: "Acero" }
    }),
    ...["Maxichorro"].map(e => {
        return { name: e, type: "Agua" }
    }),
    ...["Maxinsecto"].map(e => {
        return { name: e, type: "Bicho" }
    }),
    ...["Maxidraco"].map(e => {
        return { name: e, type: "Dragón" }
    }),
    ...["Maxitormenta"].map(e => {
        return { name: e, type: "Eléctrico" }
    }),
    ...["Maxiespectro"].map(e => {
        return { name: e, type: "Fantasma" }
    }),
    ...["Maxignición"].map(e => {
        return { name: e, type: "Fuego" }
    }),
    ...["Maxiestela"].map(e => {
        return { name: e, type: "Hada" }
    }),
    ...["Maxihelada"].map(e => {
        return { name: e, type: "Hielo" }
    }),
    ...["Maxipuño"].map(e => {
        return { name: e, type: "Lucha" }
    }),
    ...["Maxiataque"].map(e => {
        return { name: e, type: "Normal" }
    }),
    ...["Maxiflora"].map(e => {
        return { name: e, type: "Planta" }
    }),
    ...["Maxionda"].map(e => {
        return { name: e, type: "Psíquico" }
    }),
    ...["Maxilito"].map(e => {
        return { name: e, type: "Roca" }
    }),
    ...["Maxisombra"].map(e => {
        return { name: e, type: "Siniestro" }
    }),
    ...["Maxitemblor"].map(e => {
        return { name: e, type: "Tierra" }
    }),
    ...["Maxiácido"].map(e => {
        return { name: e, type: "Veneno" }
    }),
    ...["Maxiciclón"].map(e => {
        return { name: e, type: "Volador" }
    }),

].map(e => {
    e.isDynaMove = true

    return e
})