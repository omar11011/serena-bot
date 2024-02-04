const controller = require('../controllers')

// Middlewares
const isAuthorized = require("../middlewares/isAuthorized")

const { Router } = require('express')
const router = Router()

// User
router.post('/user', isAuthorized, async (req, res) => await controller.createUser(req, res))
router.put('/user-exp', isAuthorized, async (req, res) => await controller.addUserExp(req, res))
router.put('/user/balance', isAuthorized, async (req, res) => await controller.addBalance(req, res))

// Pokémon
router.get('/pokemon/form/:id', async (req, res) => await controller.getPokemonForm(req, res))
router.get('/pokemon/specie/:id', async (req, res) => await controller.getPokemonSpecie(req, res))
router.get('/pokemon/moves/:id', async (req, res) => await controller.getPokemonMovements(req, res))

router.get('/move/:id', async (req, res) => await controller.getMovement(req, res))
router.get('/spawn', async (req, res) => await controller.getPokemonSpawn(req, res))

// Capture
router.get('/capture/:id', async (req, res) => await controller.findCaptureById(req, res))
router.get('/captures/:user', async (req, res) => await controller.getCaptures(req, res))
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