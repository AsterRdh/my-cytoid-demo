import {useSearchParams} from "react-router-dom";
import {ErrorCode} from "../../long/ErrorCode";
import {BasePageProps} from "../../interface/Pages";
import {useEffect} from "react";

interface FailCheckEmailPageProps extends  BasePageProps{

}

export default function FailCheckEmailPage({isPhoneMode,minMainDivHeight}:FailCheckEmailPageProps){
    const [searchParams,setSearchParams] = useSearchParams();


    return (
        <div style={{minHeight: minMainDivHeight, height: minMainDivHeight,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div>{
                // @ts-ignore
                ErrorCode[searchParams.get("code")]
            }</div>
        </div>
    )
}