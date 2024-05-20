import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'

import {
    BrowserRouter,
} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from './dev';
import {CookiesProvider} from "react-cookie";
import {useToast} from "./utils/toast/Toast";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});



root.render(
    <React.StrictMode>

        <CookiesProvider>
            <BrowserRouter>
                <ThemeProvider theme={darkTheme}>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <App />
                    </DevSupport>
                </ThemeProvider>
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
