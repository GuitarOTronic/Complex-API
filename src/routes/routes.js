const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllers');


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

router.get('/:id/transaction/:trnsID', controller.getTransactions)
router.post('/:id/transaction/', controller.createTransaction)
router.put('/:id/transaction/:trnsID', controller.updateTransaction)
router.delete('/:id/transaction/:trnsID', controller.destroyTransaction)
module.exports = router
