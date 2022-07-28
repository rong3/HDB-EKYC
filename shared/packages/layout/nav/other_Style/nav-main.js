import React, { useEffect, useState } from 'react';
import {
    Typography,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Badge,
    MenuItem,
    Menu as MenuArea,
    List,
    Divider,
    Drawer
} from "@material-ui/core";
import {
    Menu,
    Notifications,
    AccountCircle
} from "@material-ui/icons"
import { masterConfig } from "../../../../../config/master"
import MenuListControl from "../../../control/menuItem"
import { useAuth } from "../../../provider/authBase"
import { useRouter } from 'next/router'

function NavBarMainOtherStyle(props) {
    const auth = useAuth();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const keyMenuFloat = 'bottom';
    const [stateSlide, setStateSlide] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        auth.signout();
        setAnchorEl(null);
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setStateSlide({ ...stateSlide, [keyMenuFloat]: open });
    };

    const closeSideBar = (open) => {
        setStateSlide({ ...stateSlide, [keyMenuFloat]: open });
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >
            <List className="navbar-hdbank-style2">
                <MenuListControl items={masterConfig.menu} functionInject={{
                    toogleSideBar: closeSideBar,
                }} />
            </List>
            <Divider />
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Drawer
                anchor={keyMenuFloat}
                open={stateSlide[keyMenuFloat]}
                onClose={toggleDrawer(false)}
            >
                {list(keyMenuFloat)}
            </Drawer>
            <AppBar className="navbar-hdbank-style2" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <Menu />
                    </IconButton>

                    <img onClick={() => {
                        router.push("/");
                    }} src={masterConfig.logo} alt="logo" className="" />

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                        style={{ flex: 1 }}
                    >
                    </Typography>

                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <MenuArea
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={logout}>Log out</MenuItem>
                    </MenuArea>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

NavBarMainOtherStyle.propTypes = {
};

NavBarMainOtherStyle.defaultProps = {
};

export default NavBarMainOtherStyle;
