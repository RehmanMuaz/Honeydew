import express from "express";
import * as controller from "../controllers/tagsController";

const router = express.Router();

router.route("/").get(controller.getTags).post(controller.createTag);
router.route("/:id").get(controller.getTagFromID).delete(controller.deleteTag).put(controller.editTag);

module.exports = router;