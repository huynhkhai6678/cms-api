import express from "express";
import transactionInvoiceController from "../controllers/transaction-invoice.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import path from 'path';
const __dirname = path.resolve();

var router = express.Router();

router.use(authMiddleware);
router.use(express.static(__dirname + '/public'));

router.get('/transaction-pdf/:id', transactionInvoiceController.exportTransaction);

export default router