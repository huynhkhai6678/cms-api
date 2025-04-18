import express from "express";
import i18next from "./i18n.js";

import clinicRoutes from "./routes/ClinicRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import transactionRoutes from "./routes/TransactionInvoiceRoutes.js";
import frontRoutes from "./routes/FrontRoutes.js";
import enquiryRoutes from "./routes/EnquiryRoutes.js";
import subcribeRoutes from "./routes/SubcribeRoutes.js";

import path from "path";
import cors from 'cors';

const __dirname = path.resolve();
const app = express();

// Translation
app.use((req, res, next) => {
  const lang = req.query.lang || 'en';
  req.t = i18next.getFixedT(lang);
  next();
});

//Serve static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Cors
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true // if you're using cookies or sessions
}));

app.use('/enquiries', enquiryRoutes);
app.use('/fronts', frontRoutes);
app.use('/auth', authRoutes);
app.use('/clinics', clinicRoutes);
app.use('/subscribes', subcribeRoutes);
app.use('/transactions', transactionRoutes);

const port = 4000;
app.listen(port, () => {
    console.log('Server running in http://localhost:4000');
});