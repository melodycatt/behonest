const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: "http://localhost:3000/"
}))
app.use(express.static(path.join(__dirname,'..', 'public')));

app.get('/', (req, res) => {
  console.log("haai")
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.get('/vote', (req, res) => {
  console.log("hi")
  res.sendFile(path.join(__dirname, '..', 'public', 'vote.html'));
});
app.get('/cheaters', (req, res) => {
  console.log("hi")
  res.sendFile(path.join(__dirname, 'cheaters.txt'));
});

console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")
console.log("fuckfuckfuckfu")

app.post('/register', (req, res) => {
  const { email, name, anonID } = req.body
  var token = generateToken()
  var userdata = JSON.parse(fs.readFileSync(path.join(__dirname, 'userdata.json')).toString())
  var user = { type: "normal", email: email, name: name, token: token, responses: { "political": [], "identity": [], "personal": [], "misc": [] } }
  var anonuser = { type: "anononymous", id: anonID, responses: { "political": [], "identity": [], "personal": [], "misc": [] } }
  userdata.users.push(user, anonuser)
  fs.writeFileSync(path.join(__dirname, 'userdata.json'), JSON.stringify(userdata))
  res.status(200).send({token: token})
})
app.post('/register-anon', (req, res) => {
  const { anonID } = req.body
  var anonuser = { type: "anononymous", id: anonID, responses: { "political": [], "identity": [], "personal": [], "misc": [] } }
  var userdata = JSON.parse(fs.readFileSync(path.join(__dirname, 'userdata.json')).toString())
  userdata.users.push(anonuser)
  fs.writeFileSync(path.join(__dirname, 'userdata.json'), JSON.stringify(userdata))
  res.status(200).send("im not setting up tokens for anon users dont spoof pls")
})
app.post('/survey/submit-anon', (req, res) => {
  const { anonID, category, responses } = req.body
  var userdata = JSON.parse(fs.readFileSync(path.join(__dirname, 'userdata.json')).toString())
  userdata.users.find((x) => x.id == anonID).responses[category] = responses
  fs.writeFileSync(path.join(__dirname, 'userdata.json'), JSON.stringify(userdata))
  res.status(200).send("done!")
})
app.post('/survey/submit', (req, res) => {
  const { email, token, category, responses } = req.body
  var userdata = JSON.parse(fs.readFileSync(path.join(__dirname, 'userdata.json')).toString())
  userdata.users.find((x) => x.email == email && x.token == token).responses[category] = responses
  fs.writeFileSync(path.join(__dirname, 'userdata.json'), JSON.stringify(userdata))
  res.status(200).send("done!")
})


app.post('/survey/data', (req, res) => {
  const { token, category } = req.body
  var userdata = JSON.parse(fs.readFileSync(path.join(__dirname, 'userdata.json')).toString())
  res.status(200).send({responses: userdata.userdata.users.find((x) => x.token == token).responses[category]})
}) 
app.post('/survey/dataanon', (req, res) => {
  const { token, category } = req.body
  var userdata = JSON.parse(fs.readFileSync(path.join(__dirname, 'userdata.json')).toString())
  res.status(200).send({responses: userdata.userdata.users.find((x) => x.id == token).responses[category]})
}) 

app.get('/api/question', (req, res) => {
  var question = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'question.json')).toString())
  res.status(200).send(question)
})
app.post('/api/vote', (req, res) => {
  const { vote } = req.body;
  var question = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'question.json')).toString())
  question.votes.split -= vote - 1;
  question.votes.total += 1;
  console.log(question)
  fs.writeFileSync(path.join(__dirname, '..', 'public',  'question.json'), JSON.stringify(question));
  res.status(200).send(`${question.votes.split}`);
})
app.post('/api/CHEATER', (req, res) => {
  const { vote, firstname, lastname } = req.body;
  var question = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'question.json')).toString())
  var cheaters = fs.readFileSync(path.join(__dirname, 'cheaters.txt')).toString()
  console.log(question.options, question.options[vote * 1], vote)
  cheaters += `NAME: ${firstname} ${lastname} | QUESTION: ${question.question} | VOTE: ${question.options[vote * 1]}\n`
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'cheaters.txt'), cheaters);
  res.status(200).send(`${question.votes.split}`);
})
app.post('/api/register', (req, res) => {
  const { firstname, lastname } = req.body;
  var users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'userdata.json')).toString());
  if (users.includes([firstname, lastname])) {
    res.status(400).send("alreadyregistwersdd");
    return;
  }
  users.push([firstname, lastname]);
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'userdata.json'), JSON.stringify(users));
  res.status(200).send();
})

app.get('/anon-id', (req, res) => {
  console.log("e")
  var anon = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'userdata.json')).toString())
  console.log(anon.anonID)
  res.status(200).send({id: anon.anonID})
  anon.anonID += 1;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'userdata.json'), JSON.stringify(anon))
})

app.post('/send-verification-email', (req, res) => {
  console.log("WHAT")
  const { email } = req.body;
  const verificationCode = generateVerificationCode();
  console.log(email, verificationCode)
  var codes = fs.readFileSync(path.join(__dirname, 'codes.json'));
  console.log(codes)
  codes = codes.toString()
  console.log(codes)
  codes = JSON.parse(codes)
  console.log(codes)
  console.log(codes[email])
  codes[email] = verificationCode
  console.log(JSON.stringify(codes))
  console.log(path.join(__dirname, 'codes.json'))

  // Save the verification code and email in your database here
  fs.writeFileSync(path.join(__dirname, 'codes.json'), JSON.stringify(codes))
  console.log("meow")

  sendVerificationEmail(email, verificationCode);
  console.log("meow")
  res.status(200).send('Verification email sent');
});

app.post('/verify', (req, res) => {
  const {email, code, name} = req.body
  var codes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'codes.json')).toString())
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
function generateToken() {
  var token = ""
  const symbols = "ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv0123456789+/".split("")
  for (let i = 0; i < 16; i++) {
    token += symbols[Math.floor(Math.random() * symbols.length)]
  }
  return token
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