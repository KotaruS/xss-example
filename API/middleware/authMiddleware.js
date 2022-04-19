const asyncHandler = require('express-async-handler')

const passToken = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1]
    req.token = token
    next()
  } else {
    next()
  }
})

module.exports = { passToken }
