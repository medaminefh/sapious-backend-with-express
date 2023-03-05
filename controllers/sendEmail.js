const transporter = require("../utils/nodemailer");

const sendMails = async (req, res) => {
  try {
    const email = process.env.emailAddress;
    if (!email) return res.status(400).json({ message: "Email not provided" });
    const { body } = req.body;

    if (!body)
      return res.status(400).json({ message: "Subject & body required!" });

    await transporter.sendMail({
      from: email,
      to: email,
      subject: "From Portfolio contact form",
      html: `<p> ${body} </p>`,
    });
    return res.status(200).json({
      message: "Message sent!",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.sendMails = sendMails;
