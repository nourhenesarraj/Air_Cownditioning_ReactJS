import React  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Icon } from 'semantic-ui-react'

const Navbar = () => {
    
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = 
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    return(
    <React.Fragment>
            <AppBar position="fixed">
            <Toolbar>
            <Typography>
            <Icon name='thermometer half' size='large' />
            </Typography>
            <Typography variant="h6" color="inherit" noWrap>
            TEMPCHECK
            </Typography>
            </Toolbar>
            </AppBar>
    </React.Fragment>
    )
}
export default Navbar;