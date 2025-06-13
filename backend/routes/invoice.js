const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/auth');

router.post('/', auth, invoiceController.addInvoice);
router.get('/', auth, invoiceController.getInvoices);
router.get('/:id/pdf', auth, invoiceController.getInvoicePDF);
router.delete('/:id', auth, invoiceController.deleteInvoice);
router.put('/:id', auth, invoiceController.updateInvoice);

module.exports = router; 