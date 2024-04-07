const controller = require('../controllers')

// Middlewares
const isAuthorized = require("../middlewares/isAuthorized")

const { Router } = require('express')
const router = Router()

// Serena
router.post('/serena/user', isAuthorized, async (req, res) => await controller.createUser(req, res))
router.put('/serena/user', isAuthorized, async (req, res) => await controller.updateUser(req, res))
router.post('/serena/server', isAuthorized, async (req, res) => await controller.createServer(req, res))
router.put('/serena/server', isAuthorized, async (req, res) => await controller.updateServer(req, res))
router.get('/serena/capture', async (req, res) => await controller.getCaptures(req, res))
router.post('/serena/capture', isAuthorized, async (req, res) => await controller.createCapture(req, res))
router.put('/serena/capture', isAuthorized, async (req, res) => await controller.updateCapture(req, res))
router.get('/serena/duel/:user', async (req, res) => await controller.getDuel(req, res))
router.post('/serena/duel', isAuthorized, async (req, res) => await controller.createDuel(req, res))
router.put('/serena/duel', isAuthorized, async (req, res) => await controller.updateDuel(req, res))
router.delete('/serena/duel', isAuthorized, async (req, res) => await controller.deleteDuel(req, res))

// Pokémon
router.get('/pokemon/form/:id', async (req, res) => await controller.getPokemonForm(req, res))
router.get('/pokemon/specie/:id', async (req, res) => await controller.getPokemonSpecie(req, res))
router.get('/pokemon/movement/:id', async (req, res) => await controller.getPokemonMovement(req, res))
router.get('/pokemon/spawn', async (req, res) => await controller.generatePokemonSpawn(req, res))

// Gif
router.post('/gif', isAuthorized, async (req, res) => await controller.createGif(req, res))
router.get('/gif', async (req, res) => await controller.getAllGifs(req, res))
router.get('/gif/:ctg', async (req, res) => await controller.getGif(req, res))

// Anime
router.post('/anime', isAuthorized, async (req, res) => await controller.createCharacter(req, res))
router.get('/anime/:character', async (req, res) => await controller.getAllAnime(req, res))

module.exports = router