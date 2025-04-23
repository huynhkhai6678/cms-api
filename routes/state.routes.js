import express from "express";
import StateController from "../controllers/state.controller.js";

var router = express.Router();

router.get('/states-by-country/:id', StateController.stateByCountry);

export default router