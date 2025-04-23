import fs from "fs";
import generatePDF from "../utils/pdfGenerator.js";
import helper from "../utils/helpers.js";
import moment from "moment";
import __ from "../utils/langHelper.js";

import db from '../models/index.js';


const exportTransaction = async (req, res) => {
  const transaction = await db.TransactionInvoice.findByPk(req.params.id);

  const templateSetting = await db.DocumentSetting.findAll({where: {
    clinic_id: transaction.clinic_id,
  }});

  const settings = await db.Setting.findAll({where: {
    clinic_id: transaction.clinic_id,
  }});

  const currencyId = getClinicSettingValue(settings, 'currency');
  const currency = await db.Currency.findByPk(currencyId);

  const services = await db.TransactionInvoiceService.findAll({ where: {
    transaction_invoice_id : transaction.id
  }});

  let templateData = {
    'invoice_number': transaction.invoice_number,
    'invoice_date': moment(transaction.bill_date).format('d/m/Y'),
    'patient_name': '',
    'id_number': '',
    'patient_dob': '',
    'patient_address': ''
  }

  let body = templateSetting.transaction_invoice_template;
  body = helper.parseTemplateContent(body, templateData);

  data = {
    header : templateSetting.header,
    currencyCode : currency.currency_icon,
    tranaction : transaction,
    body : body,
    services: services,
    __ : __
  }

  const filePath = await generatePDF(data, 'transaction', 'transaction.pdf');

  res.download(filePath, 'invoice.pdf', () => {
    // Optional: delete file after download
    fs.unlinkSync(filePath);
  });
}

export default {
  exportTransaction
}