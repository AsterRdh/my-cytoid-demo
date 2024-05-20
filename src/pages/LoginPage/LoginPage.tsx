import './LoginPage.css'
import { BasePageProps} from "../../interface/Pages";
import {JSEncrypt} from 'jsencrypt'
import {RasPublicKey} from '../../configs/RasPublicKey'
import React, { useRef} from "react";
import {useNavigate} from "react-router-dom";
import {ajax} from "../../utils/ajax/Ajax";
import DoubleSideBox, {DoubleSizeBoxRef} from "../../components/double-side-box/DoubleSideBox";
import RegisterBox, {RegisterData, RegisterRef} from "./RegisterBox/RegisterBox";
import LoginBox, {LoginData, LoginRef} from "./LoginBox/LoginBox";

interface LoginPageProps extends BasePageProps{
}



export default function LoginPage({minMainDivHeight,isPhoneMode}:LoginPageProps){

    const navigate = useNavigate()



    const doubleSideBoxRef = useRef<DoubleSizeBoxRef>(null);
    const registerRef = React.createRef<RegisterRef>();
    const loginRef = React.createRef<LoginRef>();

    const onLogin = (data:LoginData) => {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(RasPublicKey);
        let encrypted = encrypt.encrypt(data.password);
        let loginData={
            username:data.userName,
            password:encrypted,
            token:data.recaptchaToken
        }
        ajax({
            url:'/login',
            type:"post",
            data:loginData,
            onSuccess:(data)=>{
                console.log(data)
                if (data.OkFlag){
                    navigate("/")
                }else{
                    loginRef.current?.setRespError({error:true,msg:data.Message})
                }
            }
        })

        return true;
    }

    const onRegister = (data:RegisterData) => {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(RasPublicKey);
        let encrypted = encrypt.encrypt(data.password);
        let regData={
            username:data.userName,
            password:encrypted,
            eMail:data.eMail,
            token:data.recaptchaToken
        }
        ajax({
            url:'/register',
            type:"post",
            data:regData,
            onSuccess:(data)=>{
                console.log(data)
                if (data.OkFlag){
                    navigate("/")
                }else{
                    registerRef.current?.setRespError({error:true,msg:data.Message})
                }
            }
        })
    }

    return (
        <div className={"login-page"} style={{minHeight: minMainDivHeight, height: minMainDivHeight}}>
            <div style={{flex: 1}}></div>
            <div className={"login-page-inner"}>
                <div className={"login-page-left"} style={{flex: isPhoneMode ? 0 : 1}}>
                </div>
                <div className={'login-page-right'} style={{flex: 1}}>
                    <DoubleSideBox
                        side={'font'}
                        fontCard={<LoginBox onLogin={onLogin} onRef={loginRef} changeCadeSide={()=>doubleSideBoxRef.current?.setSide("back")}/>}
                        backCard={<RegisterBox onRegister={onRegister} onRef={registerRef} changeCadeSide={()=>doubleSideBoxRef.current?.setSide("font")}/>}
                        onRef={doubleSideBoxRef}
                    />
                </div>
            </div>
            <div style={{flex: 1}}></div>

        </div>
    )
}