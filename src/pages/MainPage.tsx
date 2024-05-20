import './MainPage.css'

import {Avatar,  Button, Card,  Chip,  Grid, IconButton, Stack} from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import LOGO from '../assets/image/logo.png'
import EXEC from '../assets/image/exe.png'
import discord from '../assets/image/discord.webp'
import patreon from '../assets/image/patreon.webp'
import news01 from '../assets/image/card/news/EXE45CoverArt.webp'
import news02 from '../assets/image/card/news/MM_BattleChip_Challenge_promo.webp'
import news03 from '../assets/image/card/news/MMBN5DTArt.webp'
import news04 from '../assets/image/card/news/Normal_bn4blue_promo.webp'
import news05 from '../assets/image/card/news/MMBNEarlyConcept.webp'
import news06 from '../assets/image/card/news/Capcom495.webp'
import avatar01 from '../assets/image/avatar/头像1.jpg'
import avatar02 from '../assets/image/avatar/头像2.png'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';


import {AppStore, GooglePlay} from "../assets/logo/Logos";
import React, { useRef} from "react";
import ImageCard from "../components/ImageCard/ImageCard";
import {BasePageProps} from "../interface/Pages";

interface IndexPageProps extends BasePageProps{
}
export default function IndexPage({isPhoneMode,minMainDivHeight}:IndexPageProps){

    const LogoDivRef = useRef<HTMLDivElement>(null)
    return(
        <div>
            <div className={"index-div"}>
                <div className={'app-logo-box'} >
                    <div style={{position: "absolute", top: isPhoneMode?'3rem':'2rem', right: '15%',transitionDuration:'0.2s'}}>
                        <img src={EXEC} style={{height: '120vmin', objectFit: "cover", position: "relative", top: 0}}/>
                    </div>
                    <div style={{position:"relative",marginTop: isPhoneMode?'6rem':'3rem',zIndex:2,transitionDuration:'0.2s',marginLeft:isPhoneMode?0:'5rem'}}
                         ref={LogoDivRef}
                    >
                        <div style={{overflow:"hidden"}}>
                            <img src={LOGO} style={{width: '85vmin', objectFit: "cover"}}/>
                        </div>
                        <div style={{textAlign: isPhoneMode?'center': "left",margin:5}}>
                            一个我喜欢的游戏的演示网页
                        </div>
                        <div style={{textAlign: isPhoneMode?'center': "left"}}>
                            <Button variant="contained" startIcon={<GooglePlay/>} style={{margin:2}}>前问 Google Play 下载</Button>
                            <Button variant="contained" startIcon={<AppStore/>} style={{margin:2}}>前问 App Store 下载</Button>
                        </div>
                    </div>
                </div>
                <div style={{position: "relative", zIndex: 2,marginTop:'5rem'}}>
                    <div style={{minHeight: 'calc(' + minMainDivHeight + 'px - 7rem)', minWidth: 1,maxWidth:'calc(100vw - 6rem)'}}>
                        <Grid container spacing={2}>
                            <Grid item  xs={12} sm={12} md={8} lg={8} xl={8}>
                                <Card>
                                    <CardHeader title="新闻"/>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <ImageCard
                                                key={"a1"}
                                                topText={"2 个月前"}
                                                height={150}
                                                image={news01}
                                                alt="新闻1"
                                                title={"新闻1 标题"}
                                                subTitle={"新闻1 副标题"}
                                            />
                                            <ImageCard
                                                key={"a2"}
                                                topText={"8 个月前"}
                                                height={150}
                                                image={news02}
                                                alt="新闻2"
                                                title={"新闻2 标题"}
                                                subTitle={"新闻2 副标题"}
                                            />
                                            <ImageCard
                                                key={"a3"}
                                                topText={"9 个月前"}
                                                height={150}
                                                image={news03}
                                                alt="新闻3"
                                                title={"新闻3 标题"}
                                                subTitle={"新闻3 副标题"}
                                            />
                                            <ImageCard
                                                key={"a4"}
                                                topText={"12 个月前"}
                                                height={150}
                                                image={news04}
                                                alt="新闻4"
                                                title={"新闻4 标题"}
                                                subTitle={"新闻4 副标题"}
                                            />
                                        </Stack>

                                    </CardContent>
                                    <CardActions>
                                        <Button>
                                            查看以前的新闻
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Grid container spacing={2} columns={1}>
                                    <Grid item sm={12} xs={12}>
                                        <Card>
                                            <CardHeader title="精选合集"/>
                                            <CardContent>
                                                <ImageCard
                                                    key={"b1"}
                                                    topText={
                                                        <div style={{display:"flex",justifyContent: "space-between",alignItems:"center",width:'100%'}}>
                                                            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                                <Avatar alt="Aster" src={avatar02} />
                                                                <div style={{marginLeft:5,fontSize:'1rem'}}>
                                                                    Aster
                                                                </div>
                                                            </div>
                                                            <Chip label="27个关卡" />

                                                        </div>
                                                    }
                                                    height={200}
                                                    image={news05}
                                                    alt="合集1"
                                                    title={"合集1 标题"}
                                                    subTitle={"合集1 副标题"}
                                                />
                                            </CardContent>
                                            <CardActions>
                                                <Button>
                                                    查看所有合集
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                        <Card>
                                            <CardHeader title="最新精选关卡"/>
                                            <CardContent>
                                                <ImageCard
                                                    key={"b2"}
                                                    topText={
                                                        <div style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            width: '100%'
                                                        }}>
                                                            <div style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center"
                                                            }}>
                                                                <Avatar alt="Aster" src={avatar01}/>
                                                                <div style={{marginLeft: 5, fontSize: '1rem'}}>
                                                                    猫猫
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    height={200}
                                                    image={news06}
                                                    alt="新闻1"
                                                    title={"新闻1 标题"}
                                                    subTitle={"新闻1 副标题"}
                                                    subActions={[
                                                        <Chip key={"b2-EZ"} label="EZ 3" color="success"  onClick={()=>{}}/>,
                                                        <Chip key={"b2-HD"} label="HD 8" color={'primary'} onClick={()=>{}}/>,
                                                        <Chip key={"b2-EX"} label="EX 12" color={'error'} onClick={()=>{}}/>,
                                                        <IconButton key={"b2-play"} aria-label="delete">
                                                            <PlayArrowIcon />
                                                        </IconButton>,
                                                    ]}
                                                />
                                            </CardContent>
                                            <CardActions>
                                                <Button>
                                                    查看全部关卡
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>bar2</Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Card>
                                    <CardHeader title="最新游玩纪录"/>
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader title="最新推文"/>
                                            <CardContent>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader title="评论"/>
                                            <CardContent>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardContent>
                                            <img src={discord} style={{height: '1.5rem'}}/>
                                            <p>想学习如何制作关卡吗？想来挑战一下高手云集的每周竞赛吗？或者，只是想和我们一起刷梗？现在就加入我们的
                                                Discord 社区吧！</p>
                                            </CardContent>
                                            <CardActions>
                                                <Button>
                                                    加入 Discord 社区！
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardContent>
                                                <img src={patreon} style={{height: '2rem'}}/>
                                                <p>Cytoid 是 100% 免费并且开源的音乐游戏。不过，服务器的运营费用十分高昂。喜欢 Cytoid 的话，不妨考虑...</p>
                                            </CardContent>
                                            <CardActions>
                                                <Button>
                                                    Become a patron!
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}