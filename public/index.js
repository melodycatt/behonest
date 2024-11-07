var page = 1;
clicknext = true;
[...document.getElementsByClassName("column")].forEach((x) => {
    x.addEventListener("click", (e) => {
        clicknext = false;
    })
})
document.body.addEventListener("click", (e) => {
    if (!clicknext) {
        clicknext = true;
        return;
    }
    page++;
    showPage(page, page - 1)
})
function showPage(p, op) {
    document.getElementById(op.toString()).style.display = "none"
    document.getElementById(p.toString()).style.display = "flex"
}
showPage(1, 1)

const registerAnon = async () => {
    const response = await fetch('/anon-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { anonID: localStorage.getItem('anonID') }
      })  
}

const anonID = async () => {
    const response = await fetch('/anon-id', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = JSON.parse(await response.text())
    var id = data.id;
    localStorage.setItem('anonID', id)
    console.log(response.status, data)
  }
  //verify()
if (localStorage.getItem('anonID') == null) {
    anonID()
} else {
    if (localStorage.getItem('anonID') == null) {
        showPage(6,1)
    } else {
        window.location.href = "categories.html"
    }
}