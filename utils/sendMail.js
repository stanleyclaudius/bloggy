const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const MAIL_SENDER = process.env.MAIL_SENDER_ADDRESS;

const sendEmail = async(to, url, text) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const access_token = oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: MAIL_SENDER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access_token
      }
    });

    const mailOptions = {
      from: MAIL_SENDER,
      to,
      subject: 'Bloggy',
      html: `
        <div style="border: 5px solid #ccc; padding: 15px;">
          <h1 style="text-align: center;">Bloggy ${text}</h1>
          <p>Please click below button to proceed the chosen action</p>
          <a style="display: block; text-decoration: none; background: orange; color: #fff; width: 130px; height: 35px; text-align: center; line-height: 35px; margin-top: 15px" href=${url}>Click Me</a>
          <div style="margin-top: 20px;">
            <p>Thank you for using <strong>Bloggy</strong> for your blog management application"
            <p>Warm Regards,</p>
            <p>- Bloggy Team -</p>
          </div>
        </div>
      `
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendEmail;