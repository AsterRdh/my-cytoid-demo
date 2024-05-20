import {
    Avatar,
    Backdrop,
    BackdropTypeMap,
    Button,
    Card,
    Chip,
    CircularProgress,
    Fade,
    Grid,
    Stack,
    TextField
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, {useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";

import '@pqina/pintura/pintura.css';
import { openDefaultEditor  } from '@pqina/pintura';
import {BaseMessage} from "../../../interface/Pages";
import {enqueueSnackbar} from "notistack";
import {DefaultComponentProps} from "@mui/material/OverridableComponent";
import {ajax} from "../../../utils/ajax/Ajax";

const editImage = (image:any, done:any) => {
    const imageFile = image.pintura ? image.pintura.file : image;
    const imageState = image.pintura ? image.pintura.data : {};

    const editor = openDefaultEditor({
        src: imageFile,
        imageState,
    });

    editor.on('close', () => {
        // the user cancelled editing the image
    });

    editor.on('process', ({ dest, imageState }) => {
        Object.assign(dest, {
            pintura: { file: imageFile, data: imageState },
        });
        done(dest);
    });
};

type AccountInfo={
    ImgUrl:string,
    Username:string,
    Email:string,
    IsEmailChecked:boolean,

}

export default function AccountSetting (){
    const [file, setFile] = useState<any>();

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        },
        onDrop: (acceptedFiles) => {
            let file = acceptedFiles[0];

            editImage(file, (output:any) => {
                let newFile = Object.assign(output, {
                    preview: URL.createObjectURL(output),
                })

                setFile(newFile);
            })
        },

    })
    const [userImgUrl, setUserImgUrl] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("")
    const [emailState, setEmailState] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const thisPageRef = useRef<HTMLDivElement>(null);

    const [isUplaodingImg, setUplaodingImg] = useState(true)

    useEffect(() => {
        debugger
        //setLoading(false)

        ajax({
            url:'/authed/getUserAccountInfo',
            type:"post",
            data:{},
            autoError:true,
            onSuccess:(data:BaseMessage<AccountInfo>)=>{
                debugger
                if (data.Data){
                    setUserImgUrl(data.Data.ImgUrl);
                    setUserName(data.Data.Username);
                    setEmail(data.Data.Email);
                    setEmailState(data.Data.IsEmailChecked)
                }

            },
            onFinally:()=>{
                setLoading(false)
            }
        })



    }, []);

    useEffect(() => () => {
        if (file)
            URL.revokeObjectURL(file.preview)
        },
        [file]
    );

    const uploadImg=()=>{
        const fd = new FormData()
        fd.append('file', file)
        setUplaodingImg(true)
        fetch(
            "/authed/updateUserImg",
            {
                method: "POST",
                body: fd,
                credentials: 'include'
            }
        ) .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve( response.json());
            } else {
                switch (response.status){
                    case 401:  return Promise.reject(new Error("用户已离线，请重新登录"));
                }
                return Promise.reject(new Error(response.statusText));
            }
        }).then((data: BaseMessage<any>) => {
            setUserImgUrl(data.Data)
            setFile(null)
        }).catch((e)=>{
            enqueueSnackbar(e.message, {variant: 'error' });
        }).finally(()=>{
            setUplaodingImg(false)
        })
    }

    return(
        <div ref={thisPageRef} id={"t1"}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={isLoading}
                //component={'div'}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={2}>
                <Grid item  xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader title={<span>头像</span>}/>
                        <CardContent>
                            <Stack className={'upload-box-outer'}  direction="row" spacing={2} justifyContent={"center"} alignItems={"center"}>
                                <div>
                                    <Avatar  sx={{ width: '6rem', height: '6rem' }} src={userImgUrl}>{userImgUrl ? '' : userName}</Avatar>
                                </div>
                                <ArrowForwardIosIcon/>
                                <div {...getRootProps()} className={'upload-box'}>
                                    <input {...getInputProps()} />
                                    {
                                        file?
                                            <Avatar  sx={{ width: '6rem', height: '6rem' }} src={file.preview}>{userImgUrl ? '' : userName}</Avatar>:
                                            <p>拖拽或点击此处上传头像</p>
                                    }
                                </div>
                            </Stack>
                            <div style={{textAlign:"right"}}>
                                <Button disabled={!file} onClick={uploadImg}>确定</Button>
                            </div>

                        </CardContent>
                    </Card>

                </Grid>
                <Grid item  xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader title="邮箱"/>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <span>{email}</span>
                                </Grid>
                                <Grid item xs={3}>
                                    <Chip label={emailState?"已认证":"待认证"} color={emailState?"success":"warning"} variant="outlined" />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button>重新发送</Button>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField  size="small" fullWidth label="新电子邮箱地址" id="email-new" autoComplete='off'/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button>更换邮箱</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>

    )
}