import {BaseMessage} from "../../interface/Pages";
import {VariantType, useSnackbar, enqueueSnackbar} from 'notistack';
export type ajaxProps<T>={
    url:string
    data:any
    onSuccess:(res:BaseMessage<T>)=>void
    onError?:(error:any)=>void
};
export type ajaxProps2<T>={
    url:string
    type?:'get'|'post'
    data?:any
    onSuccess:(res:BaseMessage<T>)=>void
    onError?:(error:any)=>void
    onFinally?:()=>void
    autoError?:boolean
};

export function ajax<T>({url,type='get',data,onSuccess,onError,onFinally,autoError}:ajaxProps2<T>) {


    fetch(url,
        {
            method: type,
            body: type === 'get' ? undefined : JSON.stringify(data || {}),
            credentials: 'include'
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve( response.json());
            } else {
                switch (response.status){
                    case 401:  return Promise.reject(new Error("用户已离线，请重新登录"));
                }
                return Promise.reject(new Error(response.statusText));
            }
        })
        .then((data: BaseMessage<any>) => {
            if (autoError){
                if (data.OkFlag){
                    onSuccess(data)
                }else {
                    console.log(data)
                    if (onError){
                        onError(data)
                    }else {
                        enqueueSnackbar(data.Message, {variant: 'error' });
                    }
                }
            }else {
                onSuccess(data)
            }
        })
        .catch((e)=>{
            console.log(e)
            if (onError){
                onError(e)
            }else {
                enqueueSnackbar(e.message, {variant: 'error' });
            }
        })
        .finally(onFinally?onFinally:()=>{})
}

export default class Ajax<T>{

     handleClickVariant = (variant: VariantType) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };

    public POST=({url,data,onSuccess,onError}:ajaxProps<T>)=>{
        fetch(url,
            {
                method:"post",
                body:JSON.stringify(data)
            })
            .then((response)=>{
                return response.json()
            })
            .then(onSuccess)
            .then(onError?
                onError:
                (error)=>{
                    this.handleClickVariant('error')
                }
            )
    }

    GET=(url:string)=>{

    }
}