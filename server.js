const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const accountSid = 'AC56beaba46b8e30b192c69d21d5685e1e'; // Your Account SID from www.twilio.com/console
const authToken = '2ce689263f28c5afd8e0c0b665bb8a08'; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    client.messages.create({
        body: `Your OTP is ${otp}`,
        to: phoneNumber, // Text this number
        from: '+919392252420' // From a valid Twilio number
    }).then((message) => {
        console.log(message.sid);
        res.json({ success: true });
    }).catch((error) => {
        console.error(error);
        res.json({ success: false });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
