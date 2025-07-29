const express = require("express");
const router = express.Router();
const boneController = require("../controllers/bone.controller");

// ✅ Aquí sí funciona
router.get("/:boneName", boneController.getBoneByName);

module.exports = router;
