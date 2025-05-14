import express from "express";
import i18next from "./i18n.js";

import clinicRoutes from "./routes/clinic.routes.js";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction-invoice.route.js";
import ProfileRoutes from "./routes/profile.routes.js";
import frontRoutes from "./routes/front.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import subcribeRoutes from "./routes/subcribe.routes.js";
import stateRoutes from "./routes/state.routes.js";
import cityRoutes from "./routes/city.routes.js";
import clinicChainRoutes from "./routes/clinic-chain.routes.js";
import userRoutes from "./routes/user.routes.js";
import currencyRoutes from "./routes/currency.routes.js";
import roleRoutes from "./routes/role.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import path from "path";
import cors from 'cors';

import db from './models/index.js';

const __dirname = path.resolve();
const app = express();

// Translation
app.use((req, res, next) => {
  const lang = req.query.lang || 'en';
  req.t = i18next.getFixedT(lang);
  next();
});


db.sequelize.sync().then(() => {
  console.log('Synced DB.');
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
app.use('/profile', ProfileRoutes);
app.use('/clinic-chains', clinicChainRoutes);
app.use('/users', userRoutes);
app.use('/currencies', currencyRoutes);
app.use('/roles', roleRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/states', stateRoutes);
app.use('/cities', cityRoutes);

const port = 4000;
app.listen(port, () => {
    console.log('Server running in http://localhost:4000');
});