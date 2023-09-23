const pageName = window.location.pathname;
const isSignUpPage = pageName == '/' || pageName == '/index.html';

/**
 * Check user token
 */
const userInfo = window.localStorage.getItem("--USER-INFO--");
const message =  window.localStorage.getItem("--USER-MESSAGE");

if (userInfo && isSignUpPage) {
    window.location.href = `/profile.html`
} else if (!userInfo && !isSignUpPage) {
    window.location.href = `/`
}

if (message) {
    // if has message
    document.querySelector(".alert").textContent = message;
    window.localStorage.removeItem("--USER-MESSAGE");
}

// if it is profile page
if (!isSignUpPage) {
    const info = JSON.parse(userInfo);

    document.querySelector("ul").innerHTML = `
        <li>
            <b>Full Name:</b>
            <span>${info.name}</span>
        </li>
        <li>
            <b>Email:</b>
            <span>${info.email}</span>
        </li>
        <li>
            <b>Token:</b>
            <span>${info.accessToken}</span>
        </li>
        <li>
            <b>Password:</b>
            <span>${info.pass}</span>
        </li>
    `
}

document.querySelector("form").onsubmit = (e) => {
    e.preventDefault();

    // If page is `profile.html`
    if (!isSignUpPage) {
        window.localStorage.removeItem("--USER-INFO--")
        window.localStorage.setItem("--USER-MESSAGE", "Logout successfully!");
        window.location.href = `/`
        return
    }

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#password").value;
    const cpass = document.querySelector("#cpassword").value;

    if (!name || !email || !pass || !cpass) {
        document.querySelector(".form-alert").textContent = `Error: All fields are mandatory!`
        return
    } else if (pass != cpass) {
        document.querySelector(".form-alert").textContent = `Error: Password & Confirm Password does not match.`
        return
    }

    let accessToken = [];
    {
        const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < 16; i++) {
            accessToken.push(string[Math.floor(Math.random() * 62)]);
        }
    }

    console.log("scsd")

    const USER = {
        name,
        email,
        pass,
        accessToken: accessToken.join("")
    }

    window.localStorage.setItem("--USER-INFO--", JSON.stringify(USER));
    window.localStorage.setItem("--USER-MESSAGE", "Signup successfully!");
    window.location.href = `/profile.html`;
}