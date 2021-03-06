const express = require("express");
const router = express.Router();

const responseController = require("../controllers/ResponseController");

router.get("/response/:id", responseController.responseGetById);
router.post("/response", responseController.responseCreate);
router.put("/response/:id", responseController.responseUpdate);
router.put("/response/:id/image", responseController.responseUpdateImage);
router.delete("/response/:id", responseController.responseDelete);

router.get("/response/:id/subscription", responseController.responsesGetByIdSubscription);

module.exports = router;