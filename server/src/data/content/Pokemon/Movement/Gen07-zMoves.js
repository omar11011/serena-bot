module.exports = [

    ...["Hélice Trepanadora", "Embestida solar"].map(e => {
        return { name: e, type: "Acero" }
    }),
    ...["Hidrovórtice abisal"].map(e => {
        return { name: e, type: "Agua" }
    }),
    ...["Guadaña sedosa"].map(e => {
        return { name: e, type: "Bicho" }
    }),
    ...["Dracoaliento devastador"].map(e => {
        return { name: e, type: "Dragón" }
    }),
    ...["Gigavoltio destructor"].map(e => {
        return { name: e, type: "Eléctrico" }
    }),
    ...["Presa espectral"].map(e => {
        return { name: e, type: "Fantasma" }
    }),
    ...["Hecatombe pírica"].map(e => {
        return { name: e, type: "Fuego" }
    }),
    ...["rrumaco sideral"].map(e => {
        return { name: e, type: "Hada" }
    }),
    ...["Crioaliento despiadado"].map(e => {
        return { name: e, type: "Hielo" }
    }),
    ...["Ráfaga demoledora"].map(e => {
        return { name: e, type: "Lucha" }
    }),
    ...["Carrera arrolladora"].map(e => {
        return { name: e, type: "Normal" }
    }),
    ...["Megatón floral"].map(e => {
        return { name: e, type: "Planta" }
    }),
    ...["Disruptor psíquico"].map(e => {
        return { name: e, type: "Psíquico" }
    }),
    ...["Aplastamiento gigalítico"].map(e => {
        return { name: e, type: "Roca" }
    }),
    ...["Agujero negro aniquilador"].map(e => {
        return { name: e, type: "Siniestro" }
    }),
    ...["Barrena telúrica"].map(e => {
        return { name: e, type: "Tierra" }
    }),
    ...["Diluvio corrosivo"].map(e => {
        return { name: e, type: "Veneno" }
    }),
    ...["Picado supersónico"].map(e => {
        return { name: e, type: "Volador" }
    }),

].map(e => {
    e.isZMove = true

    return e
})