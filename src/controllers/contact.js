const Contact = require('../models/gtmailsend'); // Importing the Contact model
const { sendClientMail,sendMailIOTLAB } = require('./email');

exports.createContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phoneNumber, text } = req.body;
    const transporter = req.app.get("mailer");

    // // Create a new contact document
    const contact = await Contact.create({
      first_name,
      last_name,
      email,
      phoneNumber,
      text,
      send_message_time: new Date(),
    });

    // Send a success email to the user
    if (email && first_name && last_name) {
      await sendClientMail(email,first_name,last_name,transporter)
    }

    // // Send an email to a predefined recipient
    if (contact) {
      const { send_message_time } = contact;
      const to = "iotlabtech24@gmail.com";
      const date = new Date(send_message_time);
      const formattedDateTime = date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      await sendMailIOTLAB(
        to,
        first_name,
        last_name,
        email,
        phoneNumber,
        text,
        formattedDateTime,
        transporter
      );
    }

    res.status(200).json({ message: "Contact created successfully", data: contact});
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact", error: error.message });
  }
};
