const Tour = require("../models/Tour");

exports.getTourByIdServices = async (id) => {
  const result = await Tour.findById(id);
  return result;
};

exports.getTourServices = async (filters, queries) => {
  const result = await Tour.find(filters)
    .skip(queries.skip)
    .sort(queries.sortBy)
    .select(queries.fields)
    .limit(queries.limit);
  const totalTours = await Tour.countDocuments(filters);
  const pageCount = Math.ceil(totalTours / queries.limit);
  return { totalTours, pageCount, result };
};

exports.createTourServices = async (data) => {
  const result = await Tour.create(data);
  return result;
};

exports.updateTourByIdServices = async (tourId, data) => {
  const result = await Tour.updateOne(
    { _id: tourId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};
