const asyncHandler = require('express-async-handler')
const Entry = require('../models/mainModel')

// @desc Create new entry
// @route POST /api
// @access Public
const createEntry = asyncHandler(async (req, res) => {
  if (!req.body?.content) {
    res.status(400)
    throw new Error('Provide the content!')
  }
  const entry = await Entry.create({
    content: req.body.content,
    author: req.token,
  })
  res.status(201).json(entry)
})

// @desc Get all entries 
// @route GET /api 
// @access Public
const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find()
  if (!entries) {
    throw new Error('No entries')
  }
  res.status(200).json(entries)
})

// @desc Get an entry
// @route GET /api:id
// @access Public
const getEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id)
  if (!entry || entry.author !== req.token) {
    throw new Error('No entry here')
  }
  res.status(200).json(entry)
})


// @desc Get an entry
// @route GET /api/my/:author
// @access Public
const getEntriesOfAuthor = asyncHandler(async (req, res) => {
  if (!req.params.author) {
    throw new Error('No author provided')
  }
  const entries = await Entry.find({ 'author': req.params.author })
  if (!entries) {
    throw new Error('No entries')
  }
  res.status(200).json(entries)
})

// @desc Edit a entry
// @route PUT /api/:id
// @access Public
const updateEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params?.id)

  if (entry && req.body.content && entry.author === req.token) {
    entry.content = req.body.content
    entry.save()
    res.status(200).json({ entry })
  } else {
    res.status(400)
    throw new Error('Could not update')
  }
})

// @desc deletes a entry
// @route DELETE /api/:id
// @access Public
const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params?.id)
  if (entry && req.token === entry.author) {
    entry.remove()
  } else {
    res.status(400)
    throw new Error('Could not delete')
  }
  res.status(200).json({
    message: `Deleted entry ${req.params.id}`
  })
})


module.exports = { createEntry, getEntry, getEntries, getEntriesOfAuthor, updateEntry, deleteEntry }