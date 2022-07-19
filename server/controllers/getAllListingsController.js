const { Location, Booking } = require("../models/userModel");

const getAllListingsController = {};

// "Get all bookings" controller
getAllListingsController.getAllBookings = (req, res, next) => {
  // find all of users bookings that was stored in database associated with that username
  const { username } = req.body;
  Booking.find({ clientUsername: username }).then((result) => {
    if (result) {
      console.log("Bookings found in database!");
      res.locals.bookings = result;
      return next();
    } else {
      console.log("Bookings not found in database");
      return next({
        log: `getAllListingsController.getAllBookings error`,
        message: {
          err: "Error occured finding bookings",
        },
      });
    }
  });
};

// "Get all hostings" controller
getAllListingsController.getAllHostings = (req, res, next) => {
  // find hostings that was stored in database
  const { username } = req.body;
  Location.find({ hostName: username }).then((result) => {
    if (result) {
      console.log("Hostings found in database!");
      res.locals.hostings = result;
      return next();
    } else {
      console.log("Hostings not found in database");
      return next({
        log: `getAllListingsController.getAllHostings error`,
        message: {
          err: "Error occured finding hostings",
        },
      });
    }
  });
};

module.exports = getAllListingsController;