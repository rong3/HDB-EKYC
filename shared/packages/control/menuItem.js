import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useAccessControlContext } from "../provider/accessGateway"
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router'

const ListItemBody = ({ config, ...props }) => {
    const { t } = useTranslation('common');
    const router = useRouter()

    const alignMenu = (level) => {
        switch (level) {
            case 2: return '10px'
            case 3: return '20px'
            case 4: return '30px'
            case 5: return '40px'
            default: return '0px'
        }
    }
    const dispatchEvent = () => {
        if (config?.to) {
            props?.functionInject?.toogleSideBar(false);
            router.replace(config?.to ?? "/")
        }
    }

    return (<>
        <ListItemIcon style={{ marginLeft: alignMenu(config?.menuLevel ?? 1) }} onClick={() => {
            dispatchEvent()
        }}>
            {config.icon}
        </ListItemIcon>
        <ListItemText onClick={() => {
            dispatchEvent()
        }} primary={t(config.title)} />
    </>);
}

const MenuItem = ({ config, ...props }) => {
    return (
        <ListItem button>
            <ListItemBody {...props} config={config} />
        </ListItem>
    );
};

const ExpandableMenuItem = ({ config, ...props }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemBody {...props} config={config} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <MenuListControl {...props} items={config.items} />
            </Collapse>
        </>
    );
};


export default function MenuListControl({ items, ...props }) {
    const { isForbidden } = useAccessControlContext()

    const createList = (items) => {
        let menu = [];
        items.map((menuItem) => {
            if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
                if (menuItem?.auth && isForbidden) return;
                menu.push(<ExpandableMenuItem
                    {...props}
                    config={menuItem}
                    key={menuItem.title}
                />);
            } else {
                if (menuItem?.auth && isForbidden) return;
                menu.push(<MenuItem
                    {...props}
                    config={menuItem}
                    key={menuItem.title}
                />);
            }
        });
        return menu.concat();
    };

    return <List>{createList(items)}</List>;
}