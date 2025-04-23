import express from "express";
import CityController from "../controllers/city.controller.js";

var router = express.Router();

router.get('/cities-by-state/:id', CityController.getCityByState);

export default router