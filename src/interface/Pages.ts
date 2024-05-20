export interface BasePageProps{
    isPhoneMode:boolean,
    minMainDivHeight:number
}
export type BaseMessage<T> = {

    ErrDetails: string
    Message: string
    OkFlag: boolean
    Data?: T
}

export type ErrorType={
    error:boolean
    msg?:string
}
