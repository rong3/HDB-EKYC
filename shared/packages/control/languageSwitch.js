import React, { useEffect, useState } from 'react';
import {
    Typography,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    MenuItem,
    Menu as MenuArea,
} from "@material-ui/core";
import Flag from 'react-flagkit';
import { masterConfig } from "../../../config/master"
import { useTranslation } from "react-i18next";
import { updateLanguage } from "../../../redux/actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux"

function LanguageSwitch(props) {
    const { i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = useState(null);
    const { language } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (lan) => {
        const valueLanguage = lan?.eventCode ?? 'vn';
        i18n.changeLanguage(valueLanguage);
        dispatch(updateLanguage(valueLanguage));
        setAnchorEl(null);
    };
    const detectSelectedLanguage = () => {
        return masterConfig.language?.find(x => x.eventCode === language)?.code ?? 'VN'
    }

    return (
        <>
            {/* language */}
            <IconButton
                size="large"
                edge="end"
                aria-label="language choice"
                aria-controls="language-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Flag className="flag-custom" country={detectSelectedLanguage()} size={25} />
            </IconButton>
            <MenuArea
                id="language-appbar"
                className="menu-topbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {
                    masterConfig?.language.map((lan) => {
                        return (
                            <MenuItem onClick={() => {
                                handleClose(lan)
                            }}>
                                <Flag className="flag-custom" country={lan.code} size={25} />
                                &nbsp;{lan.text}
                            </MenuItem>
                        )
                    })
                }
            </MenuArea>
        </>
    )
}

LanguageSwitch.propTypes = {
};

LanguageSwitch.defaultProps = {
};

export default LanguageSwitch;
