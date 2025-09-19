const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const authButton = document.querySelector(".auth__button")
const authHeader = document.querySelector(".auth__header")
const registerChanger = document.querySelector(".register-link")
let isLogin = true

registerChanger.addEventListener("click", function(){
    if (isLogin){
        isLogin = false
        authHeader.textContent = "Register"
        this.textContent = "You have account?"
        authButton.value = "Sign Up"
    }else{
        isLogin = true
        authHeader.textContent = "Log In"
        this.textContent = "Don't have account?"
        authButton.value = "Sign In"
    }
})