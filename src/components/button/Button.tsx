import React, {useState} from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement>{

}
export default function BarButton(props:ButtonProps){


    return(
        <div className={'head-button'} onClick={props.onClick}>
            {props.children}
        </div>
    )

}