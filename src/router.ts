import express from 'express'
import RouterNotes from "./controllers/Notes.controller"
const router = express.Router()

router.patch('/notes/edit', RouterNotes.edit)
router.get('/notes/list', RouterNotes.search)
router.post('/notes/new', RouterNotes.create)
router.delete('/notes/delete', RouterNotes.delete)

export default router

