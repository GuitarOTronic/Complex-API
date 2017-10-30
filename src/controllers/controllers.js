const model = require('../models/models')



function getAll(req, res, next) {
  let response = model.getAll()
  res.status(200).send({
    response
  })
}

function getById(req, res, next) {

  let id = req.params.id
  let account = model.getById(id)

  if (account.errors) {

    return next({
      status: 404,
      message: account.errors
    })
  } else {

    res.status(200).json({
      account
    })
  }
}

function create(req, res, next) {
  let body = req.body

  let response = model.create(body)

  if (response.error) {

    next({
      status: 404,
      message: response.error
    })
  } else {

    res.status(201).json({
      response
    })
  }
}

function update(req, res, next) {
  let id = req.params.id
  let body = req.body
  let response = model.update(id, body)
  if (response.error) {
    next({
      status: 400,
      message: response.error
    })
  } else {
    res.status(200).json({
      response
    })
  }
}

function destroy(req, res, next) {
  let id = req.params.id
  let response = model.destroy(id)

  if (response.error) {
    next({
      status: 404,
      message: response.error
    })
  } else {
    res.status(200).json({
      response
    })
  }

}

function getTransactions(req, res, next) {
  let transaction = req.params.trnsID
  let id = req.params.id

  let response = model.getTransactions(id, transaction)
  if (response.error) {
    return next({
      status: 404,
      message: response.error
    })
  }
  res.status(200).json({
    response
  })
}

function updateTransaction(req, res, next) {
  let trnsID = req.params.trnsID
  let acctID = req.params.id

  let body = req.body
  let response = model.updateTransaction(acctID, trnsID, body)
  if (response.error) {
    next({
      status: 404,
      message: response.error
    })
  } else {
    res.status(200).json({
      response
    })
  }
}

function createTransaction(req, res, next) {
  let acctID = req.params.id
  let body = req.body
  let response = model.createTransaction(acctID, body)
  if (response.error) {
    next({
      status: 400,
      message: response.error
    })
  } else {
    res.status(200).json({
      response
    })
  }
}

function destroyTransaction(req, res, next) {
  let id = req.params.id
  let trnsID = req.params.trnsID
  let response = model.destroyTransaction(id, trnsID)

  if (response.error) {
    next({
      status: 404,
      message: response.error
    })
  } else {
    res.status(200).json({
      response
    })
  }
}



module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  getTransactions,
  updateTransaction,
  destroyTransaction,
  createTransaction
}
