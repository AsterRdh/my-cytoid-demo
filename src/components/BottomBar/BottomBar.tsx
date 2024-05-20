import {Divider, Stack} from "@mui/material";
import React from "react";

interface BottomBarProps{
    isPhoneMode:boolean,
    bottomDivRef:any
}
export default function BottomBar ({isPhoneMode,bottomDivRef}:BottomBarProps){
    return (
        <div ref={bottomDivRef} style={{
            textAlign: "center",
            minWidth: 'calc(100% - 6rem)',
            fontSize: isPhoneMode ? 'small' : "medium",
            transitionDuration: "0.2s",
            marginTop: 10
        }}>
            <Stack direction="row" spacing={0.5} divider={<Divider orientation="vertical" flexItem/>}
                   alignItems={"center"} justifyContent={"center"}>
                <a>版权（DMCA）</a>
                <a>服务条款</a>
                <a>服务状态</a>
                <a>github</a>
                <a>鸣谢</a>
                <a>语言</a>
            </Stack>
            <div>
                The Dome built by Aster. All rights reserved.
            </div>
        </div>
    )
}