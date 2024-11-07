const options = document.getElementById("options");
const results = document.getElementById("results");
const votes = document.getElementById("votes");
const question = document.getElementById("question");
const op1 = document.getElementById("o1");
const op2 = document.getElementById("o2");
const count1 = document.getElementById("count1");
const count2 = document.getElementById("count2");
const total = document.getElementById("total");
var qid;
var firstname;
var lastname;


(async () => {
    if ((getCookie("firstname") == "" || getCookie("lastname") == "")
        && (localStorage.getItem("firstnamerzv") == null && localStorage.getItem("lastnamerzv") == null)) {
        window.location.href = "/"
    } else {
        console.log("e")
        firstname = getCookie("firstname") || localStorage.getItem("firstnamerzv");
        lastname = getCookie("lastname") || localStorage.getItem("lastnamerzv");
        console.log(firstname, lastname)
    }
    const dataresponse = await fetch('/api/question', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    const questiondata = JSON.parse(await dataresponse.text());
    qid = questiondata.id;
    console.log(questiondata)
    op1.innerHTML = questiondata.options[0];
    op2.innerHTML = questiondata.options[1];
    question.innerHTML = questiondata.question;
    count1.innerHTML = questiondata.votes.split;
    total.innerHTML = `${questiondata.votes.total} votes`;
    count2.innerHTML = questiondata.votes.total - questiondata.votes.split * 1;

    votes.style.backgroundImage = `linear-gradient(to right, rgb(255, 192, 250) 0%, rgb(255, 192, 250) ${(questiondata.votes.split / questiondata.votes.total) * 100}%, rgb(192, 255, 195) ${(questiondata.votes.split / questiondata.votes.total) * 100}%, rgb(192, 255, 195) 100%)`;
    count2.style.left = `${(questiondata.votes.split / questiondata.votes.total) * 100}%`
    count1.style.right = `${100 - (questiondata.votes.split / questiondata.votes.total) * 100}%`
})();

async function vote(i) {
    if (getCookie("voted") == `${qid}` || localStorage.getItem("votedrzv") == `${qid}`) {
        question.innerHTML = "CHEATER CHEATER PUMPKIN EATER";
        op1.innerHTML = "CHEATER";
        op2.innerHTML = "CHEATER";
        const cheatres = await fetch('/api/CHEATER', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ vote: i, firstname: firstname, lastname: lastname })
        });
        return;
    }
    const voteres = await fetch('/api/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote: i, firstname: firstname, lastname: lastname })
    })

    const dataresponse = await fetch('/api/question', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    const questiondata = JSON.parse(await dataresponse.text());
    qid = questiondata.id;
    console.log(questiondata)
    op1.innerHTML = questiondata.options[0];
    op2.innerHTML = questiondata.options[1];
    question.innerHTML = questiondata.question;
    count1.innerHTML = questiondata.votes.split;
    total.innerHTML = `${questiondata.votes.total} votes`;
    count2.innerHTML = questiondata.votes.total - questiondata.votes.split * 1;

    votes.style.backgroundImage = `linear-gradient(to right, rgb(255, 192, 250) 0%, rgb(255, 192, 250) ${(questiondata.votes.split / questiondata.votes.total) * 100}%, rgb(192, 255, 195) ${(questiondata.votes.split / questiondata.votes.total) * 100}%, rgb(192, 255, 195) 100%)`;
    count2.style.left = `${(questiondata.votes.split / questiondata.votes.total) * 100}%`
    count1.style.right = `${100 - (questiondata.votes.split / questiondata.votes.total) * 100}%`

    results.style.translate = "0 0";
    results.style.opacity = "1";
    op1.parentElement.classList.add("voted");
    op2.parentElement.classList.add("voted");
    op1.parentElement.disabled = true;
    op2.parentElement.disabled = true;

    setCookie("voted", `${qid}`, 1);
    localStorage.setItem("votedrzv", `${qid}`)

}

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