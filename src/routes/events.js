const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();
router.use(validateJWT);

router.get("/", getEvent);

router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
