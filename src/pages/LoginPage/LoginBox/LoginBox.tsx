import {ErrorType} from "../../../interface/Pages";
import React, {FormEvent, Ref, useState} from "react";
import {RegisterData} from "../RegisterBox/RegisterBox";
import ReCAPTCHA from "react-google-recaptcha";
import {
    Box, Button,
    Checkbox,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Link
} from "@mui/material";
import {GitHub, Google, Key, Person, Visibility, VisibilityOff} from "@mui/icons-material";

export interface LoginData{
    userName:string
    password:string
    recaptchaToken:string
}
export interface LoginRef{
    setRespError:(e:ErrorType)=>void
    setUserNameError:(e:ErrorType)=>void
    setPasswordError:(e:ErrorType)=>void
    setTokenError:(e:ErrorType)=>void
}
interface LoginBoxProps{
    onLogin:(data:LoginData)=>void
    changeCadeSide:()=>void
    onRef:Ref<LoginRef>
}

export default function LoginBox ({onLogin,changeCadeSide,onRef}:LoginBoxProps){
    const recaptchaRef = React.createRef<ReCAPTCHA>();


    const [userNameError, setUserNameError] = useState<ErrorType>({error:false})
    const [passwordError, setPasswordError] = useState<ErrorType>({error:false})
    const [tokenError, setTokenError] = useState<ErrorType>({error:false})
    const [respError, setRespError] = useState<ErrorType>({error:false})
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        let hasError = false
        let token = recaptchaRef.current?.getValue();
        if(token){
            setTokenError({error:false})
        }else {
            setTokenError({error:true,msg:"请进行人机验证"})
            hasError=true;
        }

        let data = event.target;
        // @ts-ignore
        let {username,password} = data
        if (username){
            setUserNameError({error:false})
        }else {
            setUserNameError({error:true,msg:"用户名不能为空"})
            hasError=true;
        }
        if (password){
            setPasswordError({error:false})
        }else {
            setPasswordError({error:true,msg:"密码不能为空"})
            hasError=true;
        }

        if (hasError){
            return false;
        }
        onLogin({
            userName:username.value,
            password:password.value,
            recaptchaToken:token || ''
        });

        return true
    }
    return (
        <div className={"login-box"}>
            <form onSubmit={onSubmit}>
                <h3>
                    登录 CyberAster 账户
                </h3>
                <div>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Person sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <FormControl sx={{m: 1, width: '30ch', margin: 0}} variant="standard"
                                     error={userNameError.error}>
                            <InputLabel htmlFor="outlined-adornment-password">CyberAster ID/邮件地址</InputLabel>
                            <Input id="username" type={'text'}
                                   onChange={(e) => {
                                       setUserNameError({error: false})
                                   }}
                            />
                            <FormHelperText
                                style={{height: userNameError.msg ? '1.4rem' : '5px'}}>{userNameError.msg || ' '}</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Key sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <FormControl sx={{m: 1, width: '30ch', margin: 0}} variant="standard" error={passwordError.error}>
                            <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={(e) => {
                                    setPasswordError({error: false})
                                }}
                            />
                            <FormHelperText style={{height: passwordError.msg ? '1.4rem' : '5px'}}>{passwordError.msg || ' '}</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <FormControl sx={{m: 1, width: '31ch', margin: 0}} variant="standard" error={tokenError.error}>
                            <ReCAPTCHA
                                id={'token'}
                                sitekey="6LemttkpAAAAAB7mfSQWTqoQoUP0sxA0jkP0MSyl"
                                ref={recaptchaRef}
                                onChange={(value)=>{setTokenError({error:false})}}
                                theme={"dark"}
                            />
                            <FormHelperText style={{height: tokenError.msg ? '1.4rem' : '5px'}}>{tokenError.msg || ' '}</FormHelperText>
                        </FormControl>
                    </Box>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{textAlign: "left", fontSize: "small", color: 'red'}}>{respError.msg}</div>
                    <Link variant={'caption'}>忘记密码</Link>
                </div>
                <div style={{textAlign: "right"}}>
                    下次自动登录
                    <Checkbox/>
                </div>
                <div>
                    <Button variant="contained" style={{width: "100%"}} type={"submit"}>
                        登录
                    </Button>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop: 5
                    }}>
                        <IconButton aria-label="sing in by github">
                            <GitHub/>
                        </IconButton>
                        <IconButton aria-label="sing in by Google">
                            <Google/>
                        </IconButton>
                    </div>
                </div>
            </form>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                <div style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.4)', height: 1}}/>
                <div style={{marginRight: 15, marginLeft: 15}}>
                    OR
                </div>
                <div style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.4)', height: 1}}/>
            </div>
            <div>
                <h3>
                    还没有 CyberAster 账户？
                </h3>
                <div>
                    注册以访问 Cytoid 所有的多人游戏功能。
                    只需要 30 秒时间！
                </div>

                <div style={{marginTop: 15}}>
                    <Button variant="contained"
                            style={{width: "100%"}}
                            color="secondary"
                            onClick={() => {
                                setPasswordError({error: false})
                                setUserNameError({error: false})
                                setRespError({error: false})
                                changeCadeSide()
                            }}>
                        注册
                    </Button>
                </div>
            </div>
        </div>
    )
}