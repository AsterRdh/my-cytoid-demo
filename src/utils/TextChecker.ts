import {ErrorType} from "../interface/Pages";

export function checkEmail(email ?: string ) : ErrorType {
    if (email && email.trim()){
        let regexA = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,12})$/;
        if (regexA.test(email.trim())){
            return {error:false}
        }else {
            return {error:true,msg:"请输入正确的邮件地址"}
        }
    }else {
        return {error:true,msg:"电子邮件地址不能为空"}
    }
}

export function checkPassword(password ?: string, minLength:number = 8 ) : [ErrorType,number] {
    if (password && password.trim()){
        if (password.length < minLength ){
            return  [{error:true,msg:"密码不能小于"+minLength+"位"},0]
        }
        let a = 0;
        let regexA = new RegExp('^(?=.*[a-z])');
        let regexB = new RegExp('^(?=.*[A-Z])');
        let regexC = new RegExp('^(?=.*\\d)');
        let regexD = new RegExp('^(?=.*[!@#$%^&*,\\\\._])');
        if (regexA.test(password)){
            a++;
        }
        if (regexB.test(password)){
            a++;
        }
        if (regexC.test(password)){
            a++;
        }
        if (regexD.test(password)){
            a++;
        }
        return [{error:false},a]

    }else {
        return [{error:true,msg:"密码不能为空"},0]
    }
}