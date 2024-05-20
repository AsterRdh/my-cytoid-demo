import {
    Button,
    Card,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel, Stack
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {ErrorType} from "../../../interface/Pages";
import {deepOrange, lightGreen, yellow} from "@mui/material/colors";

export default function SecuritySetting(){

    const [oldPassword, setOldPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>()

    const [oldPasswordError, setOldPasswordError] = useState<ErrorType>({error:false})
    const [newPasswordError, setNewPasswordError] = useState<ErrorType>({error:false})
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState<ErrorType>({error:false})
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [showPassword3, setShowPassword3] = useState(false)

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const handleClickShowPassword3 = () => setShowPassword3((show) => !show);

    const [passwordStrong, setPasswordStrong] = useState<number>(0)
    const [passwordStrongColor, setPasswordStrongColor] = useState<any>()

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (newPassword){
            if (newPassword.length<=8){
                setPasswordStrong(0)
                setNewPasswordError({error:true,msg:"密码不能小于8位"})
                setPasswordStrongColor("red")
            }else {
                let regexA = new RegExp('^(?=.*[a-z])');
                let regexB = new RegExp('^(?=.*[A-Z])');
                let regexC = new RegExp('^(?=.*\\d)');
                let regexD = new RegExp('^(?=.*[!@#$%^&*,\\\\._])');
                let a = 0;
                if (regexA.test(newPassword)){
                    a++;
                }
                if (regexB.test(newPassword)){
                    a++;
                }
                if (regexC.test(newPassword)){
                    a++;
                }
                if (regexD.test(newPassword)){
                    a++;
                }
                switch (a){
                    case 0:
                        setPasswordStrong(0)
                        setPasswordStrongColor(deepOrange[500])
                        setNewPasswordError({error:true,msg:"必须包含大小写字母,特殊字符和数字"})
                        break
                    case 1:
                        setPasswordStrong(33.33)
                        setPasswordStrongColor(deepOrange[500])
                        setNewPasswordError({error:true,msg:"必须包含大小写字母,特殊字符和数字"})
                        break
                    case 2:
                        setPasswordStrong(66.66)
                        setPasswordStrongColor(yellow[500])
                        setNewPasswordError({error:false,msg:""})
                        break
                    case 3:
                    default:
                        setPasswordStrong(100)
                        setPasswordStrongColor(lightGreen[500])
                        setNewPasswordError({error:false,msg:""})
                        break

                }
            }
        }else{
            setNewPasswordError({error:true,msg:"密码不能为空"})
        }

        if (newPasswordConfirm){
            debugger
            if (newPasswordConfirm !== newPassword){
                setNewPasswordConfirmError({error:true,msg:"两次输入的密码不一致"})
            }else {
                setNewPasswordConfirmError({error:false})
            }
        }else {
            setNewPasswordConfirmError({error:true,msg:"请再次输入密码"})
        }
    }, [newPassword,newPasswordConfirm]);


    return(
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title={"更新密码"}/>
                    <CardContent>
                        <form>
                            <FormControl sx={{m: 1, margin: 0}} variant="standard" error={oldPasswordError.error} fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">旧密码</InputLabel>
                                <Input
                                    id="old-password"
                                    type={showPassword1 ? 'text' : 'password'}
                                    value={oldPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword1 ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => {
                                        setOldPassword(e.target.value)
                                        setOldPasswordError({error: false})
                                    }}
                                />
                                <FormHelperText style={{height: oldPasswordError.msg ? '1.4rem' : '5px'}}>{oldPasswordError.msg || ' '}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{m: 1, margin: 0}} variant="standard" error={newPasswordError.error}
                                         fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">新密码</InputLabel>
                                <Input
                                    id="new_password"
                                    type={showPassword2 ? 'text' : 'password'}
                                    value={newPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword2 ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => {
                                        setNewPassword(e.target.value)
                                        setNewPasswordError({error: false})
                                    }}
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
                                             style={{
                                                 width: passwordStrong + '%',
                                                 backgroundColor: passwordStrongColor
                                             }}/>
                                    </div>
                                </div>
                                <FormHelperText
                                    style={{height: newPasswordError.msg ? '1.4rem' : '5px'}}>{newPasswordError.msg || ' '}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{m: 1, margin: 0}} variant="standard" error={newPasswordConfirmError.error}
                                         fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">确认新密码</InputLabel>
                                <Input
                                    fullWidth
                                    id="new_password_confirm"
                                    type={showPassword3 ? 'text' : 'password'}
                                    value={newPasswordConfirm}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword3}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword3 ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => {
                                        setNewPasswordConfirm(e.target.value)
                                        setNewPasswordConfirmError({error: false})
                                    }}
                                />
                                <FormHelperText style={{height: newPasswordConfirmError.msg ? '1.4rem' : '5px'}}>{newPasswordConfirmError.msg || ' '}</FormHelperText>
                            </FormControl>

                            <Grid style={{width:'100%',marginTop:5}} container >
                                <Grid item xs={8}>

                                </Grid>
                                <Grid item xs={4} textAlign={"right"}>
                                    <Button variant="contained" type={"submit"}>
                                        确认变更
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}