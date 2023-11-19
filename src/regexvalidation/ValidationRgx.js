export const ValidationRgx = (value) => {
    const errMsg = {}
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    
    if(value.username ===""){
        errMsg.username = "Name is Require"
    }else if(value.username.length <= 2){
        errMsg.username = "Name must be 3 character"
    }
    if(value.email ===""){
        errMsg.email = "Email is Require"
    } else if(!emailPattern.test(value.email)){
        errMsg.email = "Email not correct"
    }
    if(value.phone ===""){
        errMsg.phone = "Phone is Require"
    } else if(!phonePattern.test(value.phone)){
        errMsg.email = "Email not correct"
    }
    if(value.gender ===""){
        errMsg.gender = "Gender is Require"
    } 
    if(value.technology.length ===0){
        errMsg.technology = "Select any technology Require"
    } 
    
    return errMsg
}