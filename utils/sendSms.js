const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports.sendSms = (to, url) => {
  try {
    client.messages
      .create({
        body: `Bloggy Account Verification - ${url}`,
        from: phoneNumber,
        to
      })
      .then(message => console.log(message.sid));
  } catch (err) {
    console.log(err);
  }
}