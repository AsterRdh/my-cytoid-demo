import React, {useContext, useEffect, useRef, useState} from 'react';
import './App.css';
import {
  Route,
  Routes, useLocation, useNavigate,
} from "react-router-dom";
import IndexPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BottomBar from "./components/BottomBar/BottomBar";
import {Button} from "@mui/material";
import {NotFoundPage} from "./pages/ErrorPages/NotFoundPage";
import BackGround from './assets/image/wallpaperMegamanEXE.jpg'
import LoginBox, {RefProp} from "./components/login/LoginBox";
import { SnackbarProvider } from 'notistack';
import SettingPage from "./pages/Account/Settings/SettingPage";
import FailCheckEmailPage from "./pages/ErrorPages/FailCheckEmailPage";


function App() {
  const navigate = useNavigate()
  const location = useLocation();
  const [isPhoneMode, setPhoneMode] = useState(false)
  const [minMainDivHeight, setMinMainDivHeight] = useState(0)
  const [minMainDivHeight2, setMinMainDivHeight2] = useState(0)
  const [showBackGround, setShowBackGround] = useState(false)



  useEffect(()=>{
    window.onresize=onWindowSizeChange
    onWindowSizeChange()
  },[])
  useEffect(() => {
    setShowBackGround(location.pathname==="/login")
  }, [location]);


  const BarDivRef = useRef<HTMLDivElement>(null)
  const bottomDivRef = useRef<HTMLDivElement>(null)
  const middleRef = useRef<HTMLDivElement>(null)
  const loginBoxRef = useRef<RefProp>(null);

  const onWindowSizeChange = () => {
    let width= window.innerWidth;
    let height= window.innerHeight;
    let phoneMode = height/width>0.9;
    let h1 = BarDivRef.current?.offsetHeight||0
    let h2 = middleRef.current?.offsetHeight||0
    let h3 = bottomDivRef.current?.offsetHeight||0
    let hh = height-h1-h2-h3
    let hh2 = height-h1-h3
    setMinMainDivHeight(hh)
    setMinMainDivHeight2(hh2)
    setPhoneMode(phoneMode)
  }

  return (
      <SnackbarProvider maxSnack={3} preventDuplicate={true}>
        <div className="App">
          <div  style={{position: "absolute", top: 0, left: 0,right:0,bottom:0,zIndex:1,overflowX:"hidden"}}>
            <div>
              <div className={'app-head-bar'} ref={BarDivRef}>
                <div className={'app-head-bar-button-group'}>
                  <Button onClick={() => navigate("/")}>
                    首页
                  </Button>
                  <Button onClick={() => navigate("/levels")}>
                    关卡
                  </Button>
                  <Button onClick={() => navigate("/wiki")}>
                    Wiki
                  </Button>
                </div>
                <LoginBox onClickLogin={() => {navigate("/login")}} onRef={loginBoxRef}/>
              </div>
            </div>
            <div ref={middleRef}>
              <Routes>
                <Route path="/" element={<IndexPage minMainDivHeight={minMainDivHeight} isPhoneMode={isPhoneMode}/>}/>
                <Route path="/login" element={<LoginPage minMainDivHeight={minMainDivHeight2} isPhoneMode={isPhoneMode}/>}/>
                <Route path="/settings" element={<SettingPage minMainDivHeight={minMainDivHeight2} isPhoneMode={isPhoneMode}/>}/>
                <Route path="/failCheckEmail" element={<FailCheckEmailPage  minMainDivHeight={minMainDivHeight2} isPhoneMode={isPhoneMode}/>}/>
                <Route path={"*"} element={<NotFoundPage/>}/>
              </Routes>
            </div>
            <BottomBar isPhoneMode={isPhoneMode} bottomDivRef={bottomDivRef}/>
          </div>
          <div style={{position: "absolute", top: 0, left: 0, height: "100vh", width: '100vw',overflow:"hidden"}} >
            {showBackGround?
            <img src={BackGround} style={{objectFit:"cover",height:"100%",width:"100%"}}/>:''}
          </div>
        </div>
      </SnackbarProvider>
  );
}

export default App;
