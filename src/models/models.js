const uuid = require('uuid/v4')
const fs = require("fs")
//
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

  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  console.log(Array.isArray(acct));
  let response
  let error = []
  let {
    name,
    bank,
    description
  } = body
  let id = uuid()

  if (!name || !bank || !description) {
    error.push(`Name, bank, and description fields are all required!`)
    return {
      error
    }
  } else {
    acct.push({
      name,
      bank,
      description,
      id
    })

    let jBody = JSON.stringify(acct)
    fs.writeFileSync('acct.json', jBody)

    return {
      body
    }
  }
}

function update(id, body) {
  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  // console.log(acct);
  let error = []
  let {
    name,
    bank,
    description
  } = body
  let account = getById(id)

  //finds index of the account to update
  let index = acct.findIndex(el => {
    return el.id === id
  })
  //checks for vaild request
  if (!name || !bank || !description) {
    error.push(`Name, bank, and description fields are all required!`)
    return {
      error
    }
  } else {
    //updates account
    account.name = name,
      account.bank = bank,
      account.description = description
    //replaces old account with updates version
    acct.splice(index, 1, account)
    let jBody = JSON.stringify(acct)
    fs.writeFileSync('acct.json', jBody)
    return account
  }

}

function destroy(id) {
  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))

  let account = getById(id)
  let error = []
  let index = acct.findIndex(el => {
    return el.id === id
  })
  if (!account.errors) {
    let destroyed = acct.splice(index, 1)
    let jBody = JSON.stringify(acct)
    fs.writeFileSync('acct.json', jBody)
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



function getTransactions(id, transaction) {
  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  let response
  let error = []
  //gets specific account
  let thisAccount = getById(id)
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
  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  let error = []

  let {
    title,
    id,
    pending,
    amount
  } = body
  let thisAccount = getById(acctID)
  let thisTransaction = getTransactions(acctID, trnsid)

  let accountIndex = acct.findIndex(el => {
    return el.id === acctID
  })
  let transIndex = thisAccount.transactions.findIndex(el => {
    return el.id === trnsid
  })

  if (!title || !pending || !amount) {
    error.push(`Title, pending status, and amount fields are all required!`)
    return {
      error
    }
  } else {
    thisTransaction.title = title
    thisTransaction.pending = pending
    thisTransaction.amount = amount
    acct[accountIndex].transactions.splice(transIndex, 1, thisTransaction)
    let jBody = JSON.stringify(acct)
    fs.writeFileSync('acct.json', jBody)
    return thisTransaction
  }
}

function createTransaction(acctID, body) {
  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  let thisAccount = getById(acctID)
  let accountIndex = acct.findIndex(el => {
    return el.id === acctID
  })
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
    let newTrans = {}
    newTrans.id = uuid()
    newTrans.title = title
    newTrans.pending = pending
    newTrans.amount = amount

    acctTrans.push(newTrans)
    acct[accountIndex].transactions.splice(0, 1, acctTrans)
    let jBody = JSON.stringify(acct)
    fs.writeFileSync('acct.json', jBody)

  }

  return acctTrans
}

function destroyTransaction(id, trnsID) {
  let acct = JSON.parse(fs.readFileSync('acct.json', 'utf-8'))
  let account = getById(id)
  let accountIndex = acct.findIndex(el => {
    return el.id === id
  })

  let transIndex = account.transactions.findIndex(el => {
    return el.id === trnsID
  })

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
    acct[accountIndex].transactions.splice(transIndex, 1)
    let jBody = JSON.stringify(acct)
    fs.writeFileSync('acct.json', jBody)

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
