import './SettingPage.css'
import {BasePageProps} from "../../../interface/Pages";
import {Avatar, Box, Button, Card, Chip, Grid, Stack, Tab, Tabs, TextField, Typography} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import React, {useState} from "react";
import CardContent from "@mui/material/CardContent";
import {useDropzone} from "react-dropzone";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LockIcon from '@mui/icons-material/Lock';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AccountSetting from "./AccountSetting";
import SecuritySetting from "./SecuritySetting";
import DonateSetting from "./DonateSetting";
import InformationSetting from "./InformationSetting";
interface SettingPageProps extends  BasePageProps{

}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width:'100%'}}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


export default function SettingPage({isPhoneMode,minMainDivHeight}:SettingPageProps){

    const [tabID, setTabID] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabID(newValue);
    };
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        }
    })
    const [userImgUrl, setUserImgUrl] = useState("");
    const [userName, setUserName] = useState("");



    return(
        <div style={{minHeight: minMainDivHeight, height: minMainDivHeight}}>
            <div style={{height:'4rem'}}/>
            <div className={"setting-page"}>
                <h3>设置</h3>
                <Box sx={{ flexGrow: 1, display: 'flex',borderRadius:5,minHeight:'100%' }}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={tabID}
                        onChange={handleChange}
                        aria-label="icon position Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider',minWidth:isPhoneMode?'4rem':'6rem' }}

                    >
                        <Tab sx={{minWidth:isPhoneMode?'4rem':'6rem'}} label={"账号"} icon={<AccountBoxIcon/>} iconPosition={isPhoneMode?"top":'start'} {...a11yProps(0)} />
                        <Tab sx={{minWidth:isPhoneMode?'4rem':'6rem'}} label={"安全"} icon={<LockIcon/>} iconPosition={isPhoneMode?"top":'start'} {...a11yProps(1)} />
                        <Tab sx={{minWidth:isPhoneMode?'4rem':'6rem'}} label={"资料"} icon={<FolderSharedIcon/>} iconPosition={isPhoneMode?"top":'start'} {...a11yProps(2)} />
                        <Tab sx={{minWidth:isPhoneMode?'4rem':'6rem'}} label={"捐赠"} icon={<CoffeeIcon/>} iconPosition={isPhoneMode?"top":'start'} {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={tabID} index={0}>
                        <AccountSetting />
                    </TabPanel>
                    <TabPanel value={tabID} index={1}>
                        <SecuritySetting/>
                    </TabPanel>
                    <TabPanel value={tabID} index={2}>
                        <InformationSetting/>
                    </TabPanel>
                    <TabPanel value={tabID} index={3}>
                        <DonateSetting/>
                    </TabPanel>
                </Box>
            </div>

        </div>
    )
}