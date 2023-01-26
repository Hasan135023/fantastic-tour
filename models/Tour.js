const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the tour"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [5, "Tour must be at least 5 characters"],
      maxLength: [100, "Name too large"],
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: [0, "Cost can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Cost must be an integer",
      },
    },
    time: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collation: { locale: "en_US", strength: 1 },
  }
);

tourSchema.methods.logger = function () {
  console.log(`${this.name} tour is created`);
};

const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;
