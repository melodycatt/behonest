const category = document.querySelector("meta[name='category']").getAttribute("content")

var data = []

if (localStorage.getItem('token') != null) { 
    const dataresponse = await fetch('/survey/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token'), category }),
    });

    data = await dataresponse.text().responses
} else if (localStorage.getItem('anonID') != null) { 
    const dataresponse = await fetch('/survey/dataanon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('anonID'), category }),
    });

    data = await dataresponse.text().responses
} else window.location.href = "/"

if (data.length > 0) {
    
}
