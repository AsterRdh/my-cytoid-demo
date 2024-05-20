import {Card, CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import './ImageCard.css';
import React from "react";
import CardActions from '@mui/material/CardActions';
interface ImageCardProps{
    topText?:string|any;
    title?:string;
    subTitle?:string;
    subActions?:React.ReactNode;
    alt?:string;
    image?: string;
    height?:number

}
export default function ImageCard ({topText,title,subTitle,alt,height,image,subActions}:ImageCardProps){
    return(
        <div >
            <Card >
                <CardActionArea>
                    <div style={{position: "absolute", top: 10, left: 15, zIndex: 2, width: 'calc(100% - 30px)'}}>
                        {topText}
                    </div>
                    <div className={'image-card-m'}/>
                    <CardMedia
                        component="img"
                        height={height}
                        image={image}
                        alt={alt}
                    >
                    </CardMedia>
                    <div style={{position: "absolute", bottom: 10, left: 15, zIndex: 2, width: 'calc(100% - 30px)'}}>
                        <div style={{fontSize: '1.5rem', fontWeight: 600}}>
                            {title+""}
                        </div>
                        <div style={{color: 'oklch(87.8891% 0.006515 275.524078 / 1)', opacity: 0.8}} >
                            <span> {subTitle+""}</span>
                        </div>
                        {
                            subActions?
                                <div style={{height:40}}/>
                                :''
                        }

                    </div>
                </CardActionArea>
                {
                    subActions?
                        <CardActions style={{width: '100%',top:-25,left:8,position:"relative",height:0,padding:0,zIndex:50}}>
                            {subActions}
                        </CardActions>
                        :''
                }
            </Card>
        </div>
)
}