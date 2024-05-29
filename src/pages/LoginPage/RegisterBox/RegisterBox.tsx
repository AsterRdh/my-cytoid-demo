import React, {FormEvent, Ref, useEffect, useImperativeHandle, useState} from "react";
import {Box, Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Key, Person, Visibility, VisibilityOff} from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import {ErrorType} from "../../../interface/Pages";
import {deepOrange, green, lightGreen, yellow} from "@mui/material/colors";
import '../LoginPage.css'
import {checkEmail, checkPassword} from "../../../utils/TextChecker";
import {Md5} from "ts-md5";

export interface RegisterData{
    userName:string
    eMail:string
    password:string
    recaptchaToken:string
}
export interface RegisterRef{
    setRespError:(e:ErrorType)=>void
    setUserNameError:(e:ErrorType)=>void
    setPasswordError:(e:ErrorType)=>void
    setEmailError:(e:ErrorType)=>void
    setTokenError:(e:ErrorType)=>void
}
interface RegisterBoxProps{
    onRegister:(data:RegisterData)=>void
    changeCadeSide:()=>void
    onRef:Ref<RegisterRef>
}

export default function RegisterBox({onRegister,changeCadeSide,onRef}:RegisterBoxProps){
    const recaptchaRef = React.createRef<ReCAPTCHA>();

    const [userName, setUserName] = useState<string>('')
    const [eMail, setEMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')

    const [userNameError, setUserNameError] = useState<ErrorType>({error:false})
    const [passwordError, setPasswordError] = useState<ErrorType>({error:false})
    const [passwordConfirmError, setPasswordConfirmError] = useState<ErrorType>({error:false})
    const [emailError, setEmailError] = useState<ErrorType>({error:false})
    const [tokenError, setTokenError] = useState<ErrorType>({error:false})
    const [respError, setRespError] = useState<ErrorType>({error:false})

    const [passwordStrong, setPasswordStrong] = useState<number>(0)
    const [passwordStrongColor, setPasswordStrongColor] = useState<any>()

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const onSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        let token = recaptchaRef.current?.getValue();
        let hasError = false

        //检查人机认证
        if(token){
            setTokenError({error:false})
        }else {
            setTokenError({error:true,msg:"请进行人机验证"})
            hasError=true;
        }

        //检查用户名
        if (userName){
            setUserNameError({error:false})
        }else {
            setUserNameError({error:true,msg:"用户名不能为空"})
            hasError=true;
        }

        //检查邮件
        let emailError = checkEmail(eMail);
        if (emailError.error){
            hasError=true;
        }
        setEmailError(emailError)


        //检查密码
        let [passwordError,strong] = checkPassword(password,8);
        if (passwordError.error){
            hasError=true;
            setPasswordError(passwordError)
        }else {
            if (strong<3){
                setPasswordError({error:true,msg:"必须包含大小写字母,特殊字符和数字"})
                hasError=true;
            }else {
                setPasswordError(passwordError)
            }
        }

        //检查二次输入密码
        if (!passwordConfirm){
            setPasswordConfirmError({error:true,msg:"请再次输入密码"})
            hasError=true;
        }else if (passwordConfirm !== password){
            setPasswordConfirmError({error:true,msg:"两次输入的密码不一致"})
            hasError=true;
        }else {
            setPasswordConfirmError({error:false})
        }
        if (hasError) return false;


        onRegister({
            userName:userName,
            password:Md5.hashStr(password),
            recaptchaToken:token || '',
            eMail:eMail
        });

        return true

    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useImperativeHandle(onRef, ()=>{
        return {
            setRespError:setRespError
        } as RegisterRef
    }, [])


    useEffect(() => {
        let [passwordError,strong] = checkPassword(password,8);
        switch (strong){
            case 0:
                setPasswordStrong(0)
                setPasswordStrongColor(deepOrange[500])
                break
            case 1:
                setPasswordStrong(33.33)
                setPasswordStrongColor(deepOrange[500])
                setPasswordError({error:true,msg:"必须包含大小写字母,特殊字符和数字"})
                break
            case 2:
                setPasswordStrongColor(yellow[500])
                setPasswordStrong(66.66)
                break
            default:
                setPasswordStrongColor(green[500])
                setPasswordStrong(100)
        }


        if (passwordError.error){
            setPasswordError(passwordError)
        }else {
            if (strong<3){
                setPasswordError({error:true,msg:"必须包含大小写字母,特殊字符和数字"})
            }else {
                setPasswordError(passwordError)
            }
        }

        if (passwordConfirm){
            if (passwordConfirm !== password){
                setPasswordConfirmError({error:true,msg:"两次输入的密码不一致"})
            }else {
                setPasswordConfirmError({error:false})
            }
        }else {
            setPasswordConfirmError({error:true,msg:"请再次输入密码"})
        }
    }, [password,passwordConfirm]);

    useEffect(() => {
        let errorType = checkEmail(eMail);
        setEmailError(errorType);
    }, [eMail]);

    return (
        <div className={"login-box"}>
            <form onSubmit={onSubmit}>
                <h3>
                    注册 CyberAster 账户
                </h3>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Person sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <FormControl
                        sx={{m: 1, width: '31ch', margin: 0}}
                        variant="standard"
                        error={userNameError.error}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">用户名</InputLabel>
                        <Input
                            id="usernam_reg"
                            type={'text'}
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                                setUserNameError({error: false})
                            }}
                        />
                        <FormHelperText
                            style={{height: userNameError.msg ? '1.4rem' : '5px'}}>{userNameError.msg || ' '}</FormHelperText>
                    </FormControl>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Person sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <FormControl sx={{m: 1, width: '31ch', margin: 0}} variant="standard" error={emailError.error}>
                        <InputLabel htmlFor="outlined-adornment-password">邮件地址</InputLabel>
                        <Input id="email_reg"
                               type={'text'}
                               value={eMail}
                               onChange={(e) => {
                                   setEMail(e.target.value)
                               }}
                        />
                        <FormHelperText
                            style={{height: emailError.msg ? '1.4rem' : '5px'}}>{emailError.msg || ' '}</FormHelperText>

                    </FormControl>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Key sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <FormControl sx={{m: 1, width: '31ch', margin: 0}} variant="standard"
                                 error={passwordError.error}>
                        <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
                        <Input
                            id="password_reg"
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
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <div>
                            <div style={{height: 18}}>
                                <div className={'password-strong-box-border'}>
                                    <div className={'password-strong-box-left'}>
                                    </div>
                                    <div className={'password-strong-box'}>
                                    </div>
                                    <div className={'password-strong-box-right'}>
                                    </div>
                                </div>
                                <div className={'password-strong-box-color'}
                                     style={{width: passwordStrong + '%', backgroundColor: passwordStrongColor}}/>
                            </div>
                        </div>
                        <FormHelperText
                            style={{height: passwordError.msg ? '1.4rem' : '5px'}}> {passwordError.msg || ' '}</FormHelperText>
                    </FormControl>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Key sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <FormControl sx={{m: 1, width: '31ch', margin: 0}} variant="standard"
                                 error={passwordConfirmError.error}>
                        <InputLabel htmlFor="outlined-adornment-password">确认密码</InputLabel>
                        <Input
                            id="password_confrim_reg"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordConfirm}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPasswordConfirm ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={passwordConfirm}
                            onChange={event => setPasswordConfirm(event.target.value)}
                        />
                        <FormHelperText style={{height: passwordConfirmError.msg ? '1.4rem' : '5px'}}>{passwordConfirmError.msg || ' '}</FormHelperText>
                    </FormControl>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <FormControl sx={{m: 1, width: '31ch', margin: 0}} variant="standard" error={tokenError.error}>
                        <ReCAPTCHA
                            id={'token_reg'}
                            sitekey="6LemttkpAAAAAB7mfSQWTqoQoUP0sxA0jkP0MSyl"
                            ref={recaptchaRef}
                            onChange={(value)=>{setTokenError({error:false})}}
                            theme={"dark"}
                        />
                        <FormHelperText style={{height: tokenError.msg ? '1.4rem' : '5px'}}>{tokenError.msg || ' '}</FormHelperText>
                    </FormControl>
                </Box>


                <Button color="secondary" variant="contained" style={{width: "100%"}} type={"submit"}>
                    注册
                </Button>
            </form>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{textAlign: "left", fontSize: "small", color: 'red'}}>{respError.msg}</div>
            </div>
            <div style={{height: 15, width: 1}}/>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                <div style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.4)', height: 1}}/>
                <div style={{marginRight: 15, marginLeft: 15}}>
                    OR
                </div>
                <div style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.4)', height: 1}}/>
            </div>
            <div>
                <h3>
                    已经有 CyberAster 账户？
                </h3>
                <div>
                    登录以访问 Cytoid 所有的多人游戏功能。
                </div>

                <div style={{marginTop: 15}}>
                    <Button
                        variant="contained"
                        style={{width: "100%"}}
                        onClick={() => {
                            setPasswordError({error: false})
                            setUserNameError({error: false})
                            setEmailError({error: false})
                            setPasswordConfirmError({error: false})
                            changeCadeSide()
                        }}>
                        登录
                    </Button>
                </div>
            </div>
        </div>
    )
}