const sendEmail = async () => {
    const email = document.getElementById('email').value;
    //const email = "edward.lenzner@gmail.com"
    console.log({ email: email })

    const response = await fetch('/send-verification-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    if (response.ok) {
      document.getElementById("verifycode").style.display = "block"
      document.getElementById("verifycodeLabel").style.display = "block"
      console.log('Verification email sent');
    } else {
      console.error('Error sending verification email');
    }
  }

  //sendEmail()

const verify = async () => {
    const email = document.getElementById('email').value;
    const code = document.getElementById('verifycode').value;
    console.log("AHAHHHHH")

    const response = await fetch('/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
    });
    console.log(response.status, await response.text())
    if (response.ok) {
      document.getElementById("success").style.display = "block"
      document.getElementById("error").style.display = "none"
    } else {
      document.getElementById("error").style.display = "block"
      document.getElementById("success").style.display = "none"

    }
}
//verify()