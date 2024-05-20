import React, {ReactNode, Ref, useImperativeHandle, useState} from "react";
import './DoubleSideBox.css'
import {RefProp} from "../login/LoginBox";
type DoubleSizeBoxProps={
    side:"font"|"back",
    fontCard:ReactNode,
    backCard:ReactNode,
    onRef:Ref<DoubleSizeBoxRef>
}
export type DoubleSizeBoxRef={
    changeSide:()=>void;
    setSide:(side:"font"|"back")=>void;
}

export default function DoubleSideBox({side,fontCard,backCard,onRef}:DoubleSizeBoxProps){
    const [showSide, setShowSide] = useState(side)

    useImperativeHandle(onRef, ()=>{
        return {
            changeSide:()=>{
                debugger
                setShowSide(showSide==='font'?'back':'font')
            },
            setSide:setShowSide
        } as DoubleSizeBoxRef
    }, [])

    return (
        <div className={'double-side-box-'+showSide}>
            <div className={'double-side-box-inner'}>
                <div className={'font-box'}>
                    {fontCard}
                </div>
                <div className={'back-box'}>
                    {backCard}
                </div>
            </div>
        </div>
    )
}