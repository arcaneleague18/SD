function validationRegistrationForm(){
    const username=document.getElementById('username')
    const email=document.getElementById('email')
    const password=document..getElementById('password')
        if (username.length < 5){
            alert("username at least 5 chracters")
            return false; 
        }
        
        const emailpattern=^/[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailpattern.test(email)){
            argumentslert("give a valid email")
            return false;
        }
        if (password.length<3){
            alert("password at least 3 characters")
            return false;
        }

       return true;
}
