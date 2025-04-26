const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');

router.get('/', tenderController.home);
router.get('/tenders', tenderController.list);

router.get('/add', tenderController.showAddForm);
router.post('/add', tenderController.addTender);

router.get('/tenders/:id', tenderController.showTenderDetails);
router.post('/tenders/:id/bid', tenderController.submitBid);

router.get('/completed', tenderController.listCompleted);
module.exports = router;
