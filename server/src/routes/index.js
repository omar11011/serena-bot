const controller = require('../controllers')

// Middlewares
const isAuthorized = require("../middlewares/isAuthorized")

const { Router } = require('express')
const router = Router()

// Serena
router.post('/user', isAuthorized, async (req, res) => await controller.createUser(req, res))
router.put('/user', isAuthorized, async (req, res) => await controller.updateUser(req, res))
router.post('/server', isAuthorized, async (req, res) => await controller.createServer(req, res))
router.put('/server', isAuthorized, async (req, res) => await controller.updateServer(req, res))

// Pokémon
router.get('/pokemon/form/:id', async (req, res) => await controller.getPokemonForm(req, res))
router.get('/pokemon/specie/:id', async (req, res) => await controller.getPokemonSpecie(req, res))
router.get('/pokemon/movement/:id', async (req, res) => await controller.getPokemonMovement(req, res))
router.get('/pokemon/spawn', async (req, res) => await controller.generatePokemonSpawn(req, res))

// Capture
router.get('/capture/:id', async (req, res) => await controller.findCaptureById(req, res))
router.get('/captures/:user', async (req, res) => await controller.getCaptures(req, res))
router.post('/capture/find', isAuthorized, async (req, res) => await controller.findCapture(req, res))
router.post('/capture', isAuthorized, async (req, res) => await controller.addCapture(req, res))
router.put('/capture', isAuthorized, async (req, res) => await controller.updateCapture(req, res))

// Gif
router.post('/gif', isAuthorized, async (req, res) => await controller.createGif(req, res))
router.get('/gif', async (req, res) => await controller.getAllGifs(req, res))
router.get('/gif/:ctg', async (req, res) => await controller.getGif(req, res))

// Anime
router.post('/anime', isAuthorized, async (req, res) => await controller.createCharacter(req, res))
router.get('/anime/:character', async (req, res) => await controller.getAllAnime(req, res))

module.exports = router