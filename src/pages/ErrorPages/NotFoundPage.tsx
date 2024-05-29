import NotFoundImg from "../../assets/image/ajo8h-dqkww.png"
import NotFoundLogo from "../../assets/image/fof.png"
export function NotFoundPage(){
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

            <img src={NotFoundImg}/>
            <img src={NotFoundLogo}/>
        </div>
    )
}