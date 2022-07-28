
import { masterConfig } from '../../../config/master'
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

export const ICON_CODE = {
    BANNER: 'BANNER',
    HOME: 'HOME',
    LOGIN: 'LOGIN',
    DASHBOARD: 'DASHBOARD',
    COMPONENT: 'COMPONENT',
    PAGE: 'PAGE'
}

export default function IconCustomize({ ...props }) {
    //https://mui.com/components/material-icons/
    switch (props.code) {
        case ICON_CODE.BANNER: return <img src={masterConfig.logo} />
        case ICON_CODE.HOME: return <HomeOutlinedIcon />
        case ICON_CODE.LOGIN: return <DescriptionOutlinedIcon />
        case ICON_CODE.DASHBOARD: return <TrendingUpOutlinedIcon />
        case ICON_CODE.COMPONENT: return <LocalLibraryOutlinedIcon />
        default: return <HomeOutlinedIcon />
    }
}