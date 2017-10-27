const uuid = require('uuid/v4')
var acct = [{
    id: '1234',
    name: 'Sean',
    bank: 'Chase',
    description: 'Theives',
    transactions: [{
      id: '11',
      title: 'groceries',
      amount: 5,
      pending: true
    }]
  },
  {
    id: "666",
    name: 'Lauren',
    bank: 'Discover',
    description: 'Theives from hell',
    transactions: [{
      id: '636',
      title: 'groceries from hell',
      amount: 5,
      pending: true
    }]

  },
  {
    id: "626",
    name: 'King Kong',
    bank: 'JP Morgan',
    description: 'Theives with bananas',
    transactions: [{
      id: '333',
      title: 'bananas',
      amount: 5,
      pending: true
    }]

  }
]


function getAll() {

  return acct

}

function getById(id) {
  let response
  let error = []
  let account = acct.forEach(function(element) {
    if (element.id === id) {
      response = element
    }
  })
  if (!response) {
    error.push(`Can not find account with id ${id}`)
    response = error
    return {
      response
    }
  } else {

    return response
  }
}

function create(body) {
  let response
  let error = []
  let {
    name,
    bank,
    description
  } = body
  let id = uuid()
  body.id = id
  if (!name || !bank || !description) {
    error.push(`Name, bank, and description fields are all required!`)
    return {
      error
    }
  } else {
    acct.push(body)
    return {
      body
    }
  }
}

function update(id, body) {
  let error = []
  let {
    name,
    bank,
    description
  } = body
  let account = getById(id)
  if (!name || !bank || !description) {
    error.push(`Name, bank, and description fields are all required!`)
    return {
      error
    }
  } else {
    account.name = name,
      account.bank = bank,
      account.description = description
    return account
  }

}

function destroy(id) {

  let account = getById(id)
  let error = []
  let index = acct.indexOf(account)
  if (account) {
    let destroyed = acct.splice(index, 1)
    return {
      destroyed
    }
  } else {
    error.push(`Account with id ${id} not found. You got no money.`)
    return {
      error
    }
  }
}
//console.log(bank[0].transactions[0].id);

function getTransactions(id, transaction) {
  let response
  let error = []
  //gets specific account
  let allTrans = getById(id)
  let thisTransaction = allTrans.transactions.forEach(function(element) {
    if (element.id === transaction) {
      response = element
    }
  })
  if (!response) {
    error.push(`Can't find account with id ${transaction}`)
    response = error
    return response
  } else {
    return response
  }
}

function updateTransaction(acctID, trnsid, body) {

  let error = []

  let {
    title,
    id,
    pending,
    amount
  } = body
  //  console.log(title);
  let thisTransaction = getTransactions(acctID, trnsid)
  if (!title || !pending || !amount) {
    error.push(`Title, pending status, and amount fields are all required!`)
    return {
      error
    }
  } else {
    thisTransaction.title = title
    thisTransaction.pending = pending
    thisTransaction.amount = amount
    return thisTransaction
  }
}

function createTransaction(acctID, body) {
  let thisAccount = getById(acctID)
  console.log(thisAccount);
  return thisAccount
}

function destroyTransaction() {}



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
