const sendClientMail = async (email, first_name, last_name, transporter) => {
  try {
    const subject = "Your Message Has Been Successfully Submitted!";
    const text = `<h1>Dear ${first_name} ${last_name},
        Thank you for reaching out to us! We are pleased to inform 
        you that your message has been successfully submitted.
        
        Our team will review your message, and if necessary,
        we will get back to you as soon as possible.</h1>`;
    const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0; width: 100%; height: 100%;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333333; text-align: center; font-size: 24px;">Thank You for Reaching Out!</h2>

      <p style="font-size: 16px; color: #555555; line-height: 1.5;">
        Dear <strong style="color: #333333;">${first_name} ${last_name}</strong>,
      </p>

      <p style="font-size: 16px; color: #555555; line-height: 1.5;">
        Thank you for reaching out to us! We are pleased to inform you that your message has been successfully submitted.
      </p>

      <p style="font-size: 16px; color: #555555; line-height: 1.5;">
        Our team will review your message, and if necessary, we will get back to you as soon as possible.
      </p>

      <p style="font-size: 16px; color: #555555; line-height: 1.5;">
        If you have any further questions or need assistance, feel free to contact us at any time.
      </p>

      <p style="font-size: 16px; color: #555555; line-height: 1.5;">
        Thank you for using <strong style="color: #1a73e8;">[IOTLAB]</strong>.
      </p>

      <p style="font-size: 16px; color: #555555; line-height: 1.5;">
        Best regards,<br>
        <strong style="color: #333333;">The IOTLAB Team</strong>
      </p>

      <p style="font-size: 16px; color: #555555; line-height: 1.5; text-align: center;">
        <a href="https://iotlab.tech/" style="color: #1a73e8; text-decoration: none;">Visit Our Website</a><br>
        <span style="color: #999999; font-size: 14px;">&copy; ${new Date().getFullYear()} IOTLAB. All Rights Reserved.</span>
      </p>
    </div>
  </div>
`;

    const mailOptions = {
      from: "noreply@gizantech.com",
      to: email, // Recipient email
      subject: subject, // Email subject
      text: text, // Plain text version
      html: html.length > 0 ? html : null,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.messageId);
  } catch (error) {
    console.error("Failed to send email: ", error.message);
  }
};
const sendMailIOTLAB = async (
  to,
  first_name,
  last_name,
  email,
  phoneNumber,
  texts,
  send_message_time,
  transporter
) => {
  try {
    const subject = `New Message Received from ${first_name} ${last_name}`;
    const text = `
  Dear Sir/Madam,

  You have received a new message from a user. Below are the details:

  Name: ${first_name} ${last_name}
  Email: ${email}
  Phone Number: ${phoneNumber}
  Message Submitted At: ${send_message_time}
  Message:
  ${texts}

  Please follow up with the user as soon as possible. Thank you.

  Best regards,
  IOTLAB Team
  Visit our website: https://iotlab.tech/
`;
    const html = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0; width: 100%; height: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333333; text-align: center; font-size: 24px; margin-bottom: 20px;">You Have a New Message</h2>
            
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Dear Sir/Madam,</p>
            
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">
              You have received a new message from a user. Below are the details:
            </p>
      
            <div style="margin-top: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
              <p style="font-size: 16px; color: #555555; line-height: 1.5;"><strong>Name:</strong> ${first_name} ${last_name}</p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;"><strong>Email:</strong> ${email}</p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;"><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;"><strong>Message Submitted At:</strong> ${send_message_time}</p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;"><strong>Message:</strong></p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;">${texts}</p>
            </div>
      
            <p style="font-size: 16px; color: #555555; line-height: 1.5; margin-top: 20px;">
              Please follow up with the user as soon as possible. Thank you.
            </p>
      
            <div style="margin-top: 30px; font-size: 0.9em; color: #777;">
              <p style="font-size: 16px; color: #555555; line-height: 1.5;">Best regards,</p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;"><strong>IOTLAB Team</strong></p>
              <p style="font-size: 14px; color: #999999; line-height: 1.5;">
                <a href="https://iotlab.tech/" style="color: #1a73e8; text-decoration: none;">Visit our Website</a>
              </p>
            </div>
          </div>
        </div>
      `;

    const mailOptions = {
      from: "noreply@gizantech.com",
      to: to, // Recipient email
      subject: subject, // Email subject
      text: text, // Plain text version
      html: html.length > 0 ? html : null,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.messageId);
  } catch (error) {
    console.error("Failed to send email: ", error.message);
  }
};

module.exports = { sendClientMail, sendMailIOTLAB };
