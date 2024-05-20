// AppContext.js
import React, {useState} from 'react';

const AppContext = React.createContext('');

export default AppContext;

export type ToastHookData={
    toastData: {  }
    addToast:(key:string,data:any)=>void
}

// @ts-ignore
export const  Toast = React.createContext<ToastHookData>();

export const useToast = ()=>{
    const [toastData, setToastData] = useState({b:'b'})
    const addToast=(key:string, data:any)=>{
        // @ts-ignore
        toastData[key]=data;
        setToastData({...toastData})
    }
    return {toastData,addToast} as ToastHookData

}

