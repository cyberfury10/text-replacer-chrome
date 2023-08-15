
import { Menu, MenuItem } from '@mui/material';
import React from 'react';

const menuItemStyle = {
    fontSize: "14px",
}

function DropDown({ menuItems, ...extraProps }) {

    return <Menu
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.32))',
                fontSize: "12px",
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            },
        }}
        {...extraProps}
    >
        {menuItems.map(({ label, onClick }) => {
            return <MenuItem style={menuItemStyle} onClick={onClick}>
                {label}
            </MenuItem>
        })}
    </Menu>


}
export default DropDown;