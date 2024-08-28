const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static(path.join(__dirname,'..', 'public')));

app.get('/', (req, res) => {
  console.log("hi")
  res.sendFile(path.join(__dirname, '..', 'public', 'verify.html'));
});

console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")


app.get('/anon-id', (req, res) => {
  var anon = JSON.parse(fs.readFileSync('../userdata.json').toString())
  console.log(anon.anonID)
  res.status(200).send(anon.anonID)
})

app.post('/send-verification-email', (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode();

  var codes = JSON.parse(fs.readFileSync('../codes.json').toString())
  codes[email] = verificationCode
  // Save the verification code and email in your database here
  fs.writeFileSync('../codes.json', JSON.stringify(codes))

  sendVerificationEmail(email, verificationCode);
  res.status(200).send('Verification email sent');
});

app.post('/verify', (req, res) => {
  const {email, code, name} = req.body
  var codes = JSON.parse(fs.readFileSync('../codes.json').toString())
  if (codes[email] == code) {

    var user = {}
    user.email = email;
    user.vCode = code;
    user.name = name;

    res.status(200).send('Correct!')
  } else {
    res.status(401).send('bad code :(')
  }
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const nodemailer = require('nodemailer');
//'adnb cnne ddfc tfzw'
console.log("adnb cnne ddfc tfzw")

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'behonestsurvey@gmail.com',
    pass: "adnb cnne ddfc tfzw"
  }
});

function sendVerificationEmail(toEmail, verificationCode) {
  const mailOptions = {
    from: 'behonestsurvey@gmail.com',
    to: toEmail,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${verificationCode}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

//sendVerificationEmail('edward.lenzner@gmail.com', "PENIS1")