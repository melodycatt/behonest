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
      document.getElementById("afterVerify").style.display = "block"
      console.log('Verification email sent');
    } else {
      console.error('Error sending verification email');
    }
  }

  //sendEmail()

const verify = async () => {
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
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
    if (!response.ok) {
      document.getElementById("error").style.display = "block"
      document.getElementById("success").style.display = "none"
      return
    }
    const response2 = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, anonID: localStorage.getItem('anonID') }),
    });
    data = await response2.text();
    localStorage.setItem('token', token)
    window.location.href = "categories.html"
}
