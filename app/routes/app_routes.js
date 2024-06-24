
const express = require('express')
const router = express.Router();
const tutorials = require("../controllers/app_controller.js");

router.post("/", tutorials.db_create);
router.get("/", tutorials.db_findAll);
router.get("/published", tutorials.db_findAllPublished);
router.get("/:id", tutorials.db_findOne);
router.put("/:id", tutorials.db_update);
router.delete("/:id", tutorials.db_delete);
router.delete("/", tutorials.db_deleteAll);

module.exports = router;