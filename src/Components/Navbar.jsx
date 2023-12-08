import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Navbar.css';

const Navbar = () => {
    return (
        <AppBar position="fixed" className='nav' sx={{backgroundColor:'#000'}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Resolution Boost
                </Typography>
                {/* <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button> */}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
