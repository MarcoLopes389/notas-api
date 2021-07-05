import express from 'express'
import RouterNotes from './controllers/Notes.controller'
import RouterUser from './controllers/Users.controller'

import { Auth } from './config/auth'
const router = express.Router()


// Notes
router.patch('/notes/edit', Auth, RouterNotes.edit)
router.get('/notes/list', Auth, RouterNotes.search)
router.post('/notes/new', Auth, RouterNotes.create)
router.delete('/notes/delete', Auth, RouterNotes.delete)
router.get('/notes/listAll', Auth, RouterNotes.searchAll)

// Users
router.post('/users/login', Auth, RouterUser.login)
router.post('/users/sign_in', RouterUser.create)
router.delete('/users/delete', Auth, RouterUser.delete)
router.patch('/users/edit', Auth, RouterUser.edit)

export default router

