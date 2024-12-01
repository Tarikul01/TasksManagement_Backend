const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  text: { type: String, required: true },
  send_message_time: { type: Date, required: false },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
