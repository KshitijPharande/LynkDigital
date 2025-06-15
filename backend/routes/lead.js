const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/auth');

router.post('/', auth, leadController.addLead);
router.get('/', auth, leadController.getLeads);
router.put('/:id/accept', auth, leadController.acceptLead);
router.put('/:id/reject', auth, leadController.rejectLead);
router.put('/:id/call', auth, leadController.updateCall);
router.put('/:id/edit', auth, leadController.editLead);

module.exports = router; 