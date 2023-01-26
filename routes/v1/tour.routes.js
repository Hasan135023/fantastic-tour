const express = require("express");
const tourRouter = express.Router();
const toursRouter = express.Router();
const tourControllers = require("../../controllers/tour.controllers");

tourRouter.route("/trending").get(tourControllers.getTrendingTours);
tourRouter.route("/cheapest").get(tourControllers.getCheapestTours);
tourRouter.route("/:id").patch(tourControllers.updateTourById);

toursRouter
  .route("/")
  .get(tourControllers.getTours)
  .post(tourControllers.createTour);

toursRouter.route("/:id").get(tourControllers.getSingleTour);

module.exports = { tourRouter, toursRouter };
