const Tour = require("../models/Tour");
const {
  createTourServices,
  getTourServices,
  updateTourByIdServices,
} = require("../services/tour.services");

exports.getSingleTour = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $inc: { viewCount: 1 },
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedTour,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getTours = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields"];

    excludeFields.forEach((field) => delete filters[field]);

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|lt|lte|gte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    let result;

    const tours = await getTourServices(filters, queries);

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const result = await createTourServices(req.body);
    res.status(200).json({
      status: "Success",
      message: "Tour is created successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "Tour is not created.",
      error: error.message,
    });
  }
};

exports.updateTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateTourByIdServices(id, req.body);
    if (result.modifiedCount) {
      res.status(200).json({
        status: "Success",
        message: "Tour is updated successfully.",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "Failure",
        message: "Tour could not be updated",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "Tour could not be updated.",
      error: error.message,
    });
  }
};

exports.getTrendingTours = async (req, res) => {
  try {
    const queries = {
      sortBy: "-viewCount",
      limit: 3,
    };
    result = await getTourServices({}, queries);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "Tours can not be found.",
      error: error.message,
    });
  }
};

exports.getCheapestTours = async (req, res) => {
  try {
    const queries = {
      sortBy: "cost",
      limit: 3,
    };
    result = await getTourServices({}, queries);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "Tours can not be found.",
      error: error.message,
    });
  }
};
