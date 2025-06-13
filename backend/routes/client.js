const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, clientController.addClient);
router.get('/', auth, clientController.getClients);
router.put('/:id/payment', auth, clientController.updatePayment);
router.put('/:id/terminate', auth, clientController.terminateClient);
router.put('/:id/status', auth, clientController.updateStatus);
router.post('/:id/payment-proof', auth, upload.single('file'), clientController.uploadPaymentProof);
router.put('/:id/restore', auth, clientController.restoreClient);
router.delete('/:id', auth, clientController.deleteClient);
router.put('/:id', auth, clientController.updateClient);

module.exports = router; 