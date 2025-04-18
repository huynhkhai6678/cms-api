import fs from "fs";
import TransactionInvoice from "../models/TransactionInvoiceModel.js";
import currencyModel from "../models/currencyModel.js";
import settingModel from "../models/SettingModel.js";
import documentSettingModel from "../models/documentSettingModel.js";
import TransactionInvoiceService from "../models/TransactionInvoiceServiceModel.js";
import generatePDF from "../utils/pdfGenerator.js";
import helper from "../utils/helpers.js";
import moment from "moment";
import __ from "../utils/langHelper.js";

const exportTransaction = async (req, res) => {
  const [transactionList] = await TransactionInvoice.findById(req.params.id);
  if (transactionList.length === 0) return res.status(404).json({ message: 'Tranaction not found' });

  const transaction = transactionList[0];
  const [templateSetting] = await documentSettingModel.getDocumentSetting(transaction.clinic_id);
  const [settings] = await settingModel.getAllSettingByClinic(transaction.clinic_id);

  const currencyId = getClinicSettingValue(settings, 'currency');
  const [currency] = await currencyModel.getCurrencyById(currencyId);

  const [services] = await TransactionInvoiceService.findAllServiceOfTransaction(transaction.id);

  let templateData = {
    'invoice_number': transaction.invoice_number,
    'invoice_date': moment(transaction.bill_date).format('d/m/Y'),
    'patient_name': '',
    'id_number': '',
    'patient_dob': '',
    'patient_address': ''
  }

  let body = templateSetting[0].transaction_invoice_template;
  body = helper.parseTemplateContent(body, templateData);

  data = {
    header : templateSetting[0].header,
    currencyCode : currency[0].currency_icon,
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