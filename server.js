import express from "express";
import i18next from "./i18n.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionInvoiceRoutes.js";
import path from "path";
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

app.use('/auth', authRoutes);
app.use('/clinics', clinicRoutes);
app.use('/transactions', transactionRoutes);

const port = 4000;
app.listen(port, () => {
    console.log('Server running in http://localhost:4000');
});