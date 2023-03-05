const sendMails = async (req, res) => {
  try {
    const email = process.env.emailAddress;
    if (!email) return res.status(400).json({ message: "Email not provided" });
    const { subject, body } = req.body;

    if (!subject || !body)
      return res.status(400).json({ message: "Subject & body required!" });

    await transporter.sendMail({
      from: email,
      to: email,
      subject,
      html: `<p> ${body} </p>`,
    });
    return res.status(200).json({
      message: "if your email valid check your inbox to reset password",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.sendMails = sendMails;
