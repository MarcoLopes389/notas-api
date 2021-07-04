import express from 'express'
import RouterNotes from './controllers/Notes.controller'
import RouterUser from './controllers/Users.controller'

import { Auth } from './config/auth'
const router = express.Router()


// Notes
router.patch('/notes/edit', RouterNotes.edit)
router.get('/notes/list', RouterNotes.search)
router.post('/notes/new', RouterNotes.create)
router.delete('/notes/delete', RouterNotes.delete)
router.get('/notes/listAll', RouterNotes.searchAll)

// Users
router.post('/users/login', RouterUser.login)
router.post('/users/sign_in', RouterUser.create)
router.delete('/users/delete', RouterUser.delete)
router.patch('/users/edit', RouterUser.edit)

export default router

