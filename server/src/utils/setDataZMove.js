module.exports = (item, type) => {
    const obj = { item: item }

    if (!obj.item) {
        if (type === 'Acero') {
            obj.item = 'Metalostal Z'
            obj.newName = 'Hélice trepanadora'
        }
        else if (type === 'Agua') {
            obj.item = 'Hidrostal Z'
            obj.newName = 'Hidrovórtice abisal'
        }
        else if (type === 'Bicho') {
            obj.item = 'Insectostal Z'
            obj.newName = 'Guadaña sedosa'
        }
        else if (type === 'Dragón') {
            obj.item = 'Dracostal Z'
            obj.newName = 'Dracoaliento devastador'
        }
        else if (type === 'Eléctrico') {
            obj.item = 'Electrostal Z'
            obj.newName = 'Gigavoltio destructor'
        }
        else if (type === 'Fantasma') {
            obj.item = 'Espectrostal Z'
            obj.newName = 'Presa espectral'
        }
        else if (type === 'Fuego') {
            obj.item = 'Pirostal Z'
            obj.newName = 'Hecatombe pírica'
        }
        else if (type === 'Hada') {
            obj.item = 'Feeristal Z'
            obj.newName = 'Arrumaco sideral'
        }
        else if (type === 'Hielo') {
            obj.item = 'Criostal Z'
            obj.newName = 'Crioaliento despiadado'
        }
        else if (type === 'Lucha') {
            obj.item = 'Lizstal Z'
            obj.newName = 'Ráfaga demoledora'
        }
        else if (type === 'Normal') {
            obj.item = 'Normastal Z'
            obj.newName = 'Carrera arrolladora'
        }
        else if (type === 'Planta') {
            obj.item = 'Fitostal Z'
            obj.newName = 'Megatón floral'
        }
        else if (type === 'Psíquico') {
            obj.item = 'Psicostal Z'
            obj.newName = 'Disruptor psíquico'
        }
        else if (type === 'Roca') {
            obj.item = 'Litostal Z'
            obj.newName = 'Aplastamiento gigalítico'
        }
        else if (type === 'Siniestro') {
            obj.item = 'Nictostal Z'
            obj.newName = 'Agujero negro aniquilador'
        }
        else if (type === 'Tierra') {
            obj.item = 'Geostal Z'
            obj.newName = 'Barrena telúrica'
        }
        else if (type === 'Veneno') {
            obj.item = 'Toxistal Z'
            obj.newName = 'Diluvio corrosivo'
        }
        else if (type === 'Volador') {
            obj.item = 'Aerostal Z'
            obj.newName = 'Picado supersónico'
        }
    }
    else {
        if (item === 'Pikastal Z') {
            obj.newName = 'Pikavoltio letal'
            obj.requiredMove = 'Placaje eléctrico'
            obj.pokemon = ['Pikachu']
        }
        else if (item === 'Ash-Pikastal Z') {
            obj.newName = 'Gigarrayo fulminante'
            obj.requiredMove = 'Rayo'
            obj.pokemon = ['Pikachu']
        }
        else if (item === 'Alo-Raistal Z') {
            obj.newName = 'Surfeo galvánico'
            obj.requiredMove = 'Rayo'
            obj.pokemon = ['Raichu']
        }
        else if (item === 'Eeveestal Z') {
            obj.newName = 'Novena potencia'
            obj.requiredMove = 'Última baza'
            obj.pokemon = ['Eevee']
        }
        else if (item === 'Snorlastal Z') {
            obj.newName = 'Arrojo intempestivo'
            obj.requiredMove = 'Gigaimpacto'
            obj.pokemon = ['Snorlax']
        }
        else if (item === 'Mewstal Z') {
            obj.newName = 'Supernova original'
            obj.requiredMove = 'Psíquico'
            obj.pokemon = ['Mew']
        }
        else if (item === 'Dueyestal Z') {
            obj.newName = 'Aluvión de flechas sombrías'
            obj.requiredMove = 'Punteada sombría'
            obj.pokemon = ['Decidueye']
        }
        else if (item === 'Incinostal Z') {
            obj.newName = 'Hiperplancha oscura'
            obj.requiredMove = 'Lariat oscuro'
            obj.pokemon = ['Incineroar']
        }
        else if (item === 'Primastal Z') {
            obj.newName = 'Sinfonía de la diva marina'
            obj.requiredMove = 'Aria burbuja'
            obj.pokemon = ['Primarina']
        }
        else if (item === 'Tapistal Z') {
            obj.newName = 'Cólera del guardián'
            obj.requiredMove = 'Furia natural'
            obj.pokemon = ['Tapu Koko', 'Tapu Bulu', 'Tapu Lele', 'Tapu Fini']
        }
        else if (item === 'Marshastal Z') {
            obj.newName = 'Constelación robaalmas'
            obj.requiredMove = 'Robasombra'
            obj.pokemon = ['Marshadow']
        }
        else if (item === 'Lycanrostal Z') {
            obj.newName = 'Tempestal rocosa'
            obj.requiredMove = 'Roca afilada'
            obj.pokemon = ['Lycanroc']
        }
        else if (item === 'Mimikyustal Z') {
            obj.newName = 'Somanta amistosa'
            obj.requiredMove = 'Carantoña'
            obj.pokemon = ['Mimikyu']
        }
        else if (item === 'Kommostal Z') {
            obj.newName = 'Estruendo implacable'
            obj.requiredMove = 'Fragor escamas'
            obj.pokemon = ['Kommo-o']
        }
        else if (item === 'Solgaleostal Z') {
            obj.newName = 'Embestida solar'
            obj.requiredMove = 'Meteoimpacto'
            obj.pokemon = ['Solgaleo', 'Necrozma']
        }
        else if (item === 'Lunalastal Z') {
            obj.newName = 'Deflagración lunar'
            obj.requiredMove = 'Rayo umbrío'
            obj.pokemon = ['Lunala', 'Necrozma']
        }
        else if (item === 'Ultranecrostal Z') {
            obj.newName = 'Fotodestrucción apocalíptica'
            obj.requiredMove = 'Géiser fotónico'
            obj.pokemon = ['Necrozma']
        }
    }

    return obj
}