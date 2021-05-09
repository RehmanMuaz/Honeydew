import express from "express";
import * as controller from "../controllers/countryController";

const router = express.Router();

router.route("/").get(controller.getCountries).post(controller.createCountry);
router.route("/list").post(controller.createCountries); // Only for setup
router.route("/:id").get(controller.getCountryFromID).delete(controller.deleteCountry).put(controller.editCountry);

module.exports = router;