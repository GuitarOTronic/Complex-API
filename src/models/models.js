const uuid = require('uuid/v4')
const fs = require("fs")
// var acct = [{
//     id: '1234',
//     name: 'Sean',
//     bank: 'Chase',
//     description: 'Theives',
//     transactions: [{
//       id: '11',
//       title: 'groceries',
//       amount: 5,
//       pending: true
//     }]
//   },
//   {
//     id: "666",
//     name: 'Lauren',
//     bank: 'Discover',
//     description: 'Theives from hell',
//     transactions: [{
//       id: '636',
//       title: 'groceries from hell',
//       amount: 5,
//       pending: true
//     }]
//
//   },
//   {
//     id: "626",
//     name: 'King Kong',
//     bank: 'JP Morgan',
//     description: 'Theives with bananas',
//     transactions: [{
//       id: '333',
//       title: 'bananas',
//       amount: 5,
//       pending: true
//     }]
//
//   }
// ]
// let jFile = JSON.stringify(acct)
// fs.writeFileSync('acct.json', jFile)

function getAll() {

  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  return acct
  // console.log(acct);

}

function getById(id) {
  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  let response
  let errors = []

  let account = acct.find(function(element) {
    return element.id === id
  })
  if (!account) {

    errors.push({
      error: `Can not find account with id ${id}`
    })
    response = {
      errors
    }
    return response

  }
  return account
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
  let thisAccount = getById(id)
  // console.log(thisAccount.errors);
  if (thisAccount.errors) {
    error.push(thisAccount.errors[0])
    return error
  }

  let thisTrans = thisAccount.transactions.find(el => {

    if (el.id === transaction) {
      return el
    }
  })

  if (!thisTrans) {
    error.push(`Can not find transaction with id ${transaction}`)
    return error
  } else {
    return thisTrans
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
  let acctTrans = thisAccount.transactions
  let {
    title,
    pending,
    amount
  } = body
  let error = []
  if (!title || !pending || !amount) {
    error.push(`Title, pending status, and amount fields are all required`)
    return {
      error
    }
  } else {
    let newTrans = body
    newTrans.id = uuid()
    acctTrans.push(newTrans)
  }

  return acctTrans
}

function destroyTransaction(id, trnsID) {
  let account = getById(id)
  let error = []
  if (account.errors) {
    error.push(account.errors)
    return error
  }
  let transaction = getTransactions(id, trnsID)
  if (transaction.response) {
    if (account.response) {
      error.push(account.response)
    } else {
      error.push(transaction.response)
    }
    return {
      error
    }
  }

  //find index of the transaction to be deleted
  let index = account.transactions.indexOf(transaction)
  if (account && transaction) {
    account.transactions.splice(index, 1)
    return transaction
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
