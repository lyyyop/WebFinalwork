// ###########################
// LOGIN
// ###########################

const loginButton = document.querySelector("form.login input[name='login']");

loginButton.addEventListener("click", login);

function login() {
    const Uname = document.querySelector("form.login input[name='Uname']").value;
    const Upassword = document.querySelector("form.login input[name='Upassword']").value;

    let verifyUser = {
        Uname: Uname,
        Upassword: Upassword
    }
    
    fetch("/login", {
        method: "POST",
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(verifyUser)
    }).then(result => result.json()).then(result => checkLoginStatus(result));
}

function checkLoginStatus(result){
    console.log(result);
    if(result.status === true){
        console.log("Redirect User");
        window.location.replace("/main.html");
    }
    else{
        console.log("Error");
        window.location.replace("/login.html");
    }
}