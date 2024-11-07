async function register() {
    const fn = document.getElementById("fn").value;
    const ln = document.getElementById("ln").value;

    const voteres = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname: fn, lastname: ln })
    });

    if (voteres.status == 200) {
        localStorage.setItem("firstnamerzv", fn);
        localStorage.setItem("lastnamerzv", ln);
        setCookie("firstname", fn);
        setCookie("lastname", ln);
        window.location.href = "/vote"
    }
}

(async function () { if ((getCookie("firstname") != "" && getCookie("lastname") != "")
                        || (localStorage.getItem("firstnamerzv") != null && localStorage.getItem("lastnamerzv") != null)
    ) {
        window.location.href = "/vote"
}})()

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}