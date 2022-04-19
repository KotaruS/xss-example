const express = require('express')
const router = express.Router()
const { createEntry, getEntry, getEntries, getEntriesOfAuthor, updateEntry, deleteEntry } = require('../controllers/mainController')
const { passToken } = require('../middleware/authMiddleware')

router.post('/', passToken, createEntry)
router.get('/', getEntries)

router.get('/:id', passToken, getEntry)
router.get('/my/:author', getEntriesOfAuthor)
router.put('/:id', passToken, updateEntry)
router.delete('/:id', passToken, deleteEntry)

module.exports = router