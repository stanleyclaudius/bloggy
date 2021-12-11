const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
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

module.exports.sendOTP = async(to, channel) => {
  try {
    const data = await client
      .verify
      .services(serviceId)
      .verifications
      .create({
        to,
        channel
      });

    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports.verifyOTP = async(to, code) => {
  try {
    const data = await client
      .verify
      .services(serviceId)
      .verificationChecks
      .create({
        to,
        code
      });

    return data;
  } catch (err) {
    console.log(err);
  }
}