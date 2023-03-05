const { sendMails } = require("../controllers/sendEmail");

const router = require("express").Router();

router.post("/", sendMails);
