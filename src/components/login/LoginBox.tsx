import React, {Ref, useEffect, useImperativeHandle, useState} from 'react';
import {Avatar, Button, CircularProgress, Divider, IconButton, Menu, MenuItem, Stack} from "@mui/material";
import { useCookies,Cookies } from 'react-cookie';
import Ajax, {ajax} from "../../utils/ajax/Ajax";
import {BaseMessage} from "../../interface/Pages";
import {BaseUserData} from "../../interface/User";
import {useNavigate} from "react-router-dom";

interface LoginBoxProps{
    onClickLogin:()=>void
    onRef:Ref<RefProp>
}
export type RefProp={
    setShowLoginBox:(show:boolean)=>void
    setIsLoginBox:(hasLog:boolean)=>void
}


export default function LoginBox({onClickLogin,onRef}:LoginBoxProps){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const [showLoginBox, setShowLoginBox] = useState(true)
    const [isLogin, setIsLogin] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
    const [userName, setUserName] = useState("")
    const [userImgUrl, setUserImgUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useImperativeHandle(onRef, ()=>{
        return {
            setShowLoginBox:setShowLoginBox,
            setIsLoginBox:setIsLogin
        } as RefProp
    }, [])

    useEffect(() => {
        if (cookies && cookies.session_id){
           setIsLogin(true)
        }else {
            setIsLogin(false)
        }
    }, [cookies]);

    useEffect(() => {
        if (isLogin){
            setIsLoading(true);
            ajax({
                url:'/authed/getUserBaseData',
                onSuccess:(data:BaseMessage<BaseUserData>)=>{
                    if (data.Data){
                        setUserName(data.Data.Username)
                        setUserImgUrl(data.Data.UserImgUrl)
                    }
                },
                onFinally:()=>{
                    setIsLoading(false)
                }
            })
        }
    }, [isLogin]);

    const onLogout=()=>{
        ajax({
            url:'/authed/logout',
            onSuccess:(res)=>{},
            onFinally:()=>{
                removeCookie('session_id')
                setIsLogin(false)
                setShowLoginBox(true)
            }
        })

        handleClose()
    }

    const onOpenSetting=()=>{
        navigate("/settings")
        handleClose()
    }


    const renderUserBox=()=> {
        return (
            <div>
                {isLoading?<CircularProgress /> :
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",}}>

                    <div style={{paddingRight:15,paddingLeft:15}}>
                        <Button
                            aria-label="user-acatar"
                            size="small"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            style={{paddingRight:15,paddingLeft:15}}

                        >
                            <span style={{marginRight: 15}}> {userName}</span>
                            <Avatar src={userImgUrl}>{userImgUrl ? '' : userName}</Avatar>
                        </Button>

                        <Menu
                            id="account-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}

                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={onOpenSetting}>用户设置</MenuItem>
                            <Divider />
                            <MenuItem onClick={onLogout}>登出</MenuItem>
                        </Menu>
                    </div>


                </div>}
            </div>)
    }
    const renderLoginBox = () => {
        return showLoginBox ?
            <Button variant="outlined" onClick={()=>{onClickLogin();setShowLoginBox(false)}}>
                登录
            </Button>:''
    }


    return(

        <div style={{position:"relative",height:50,width:130,textAlign:"right",display:"flex",justifyContent:"center",alignItems:"center"}}>
            {isLogin?renderUserBox():renderLoginBox()}
        </div>
    )
}