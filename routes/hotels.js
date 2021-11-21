const express = require("express");
const router = express.Router();
const hotels = require('../controller/hotels');
const Hotel = require("../models/hotel");
const { isLoggedIn } = require("../middleware");

router.route('/')
    .get(hotels.index)
    .post(isLoggedIn, hotels.createHotel)

router.get("/new", isLoggedIn, hotels.renderNewForm);

router.route('/:id')
    .get(hotels.showHotel)
    .put(isLoggedIn, hotels.updateHotel)
    .delete(isLoggedIn, hotels.destroyHotel)

router.get("/:id/edit", isLoggedIn, hotels.renderEditForm);




module.exports = router;
