import { Button, Drawer } from 'antd'
import React, { useState } from 'react'
import useKeyChanged, { KeyCodes } from '../../util/keycontrol/reactcontrol/ReKeyListener'

const Menu = _props => {

    const [menuOpen,setMenuOpen] = useState(false) 

    useKeyChanged(isPushing => {
        // console.log('isPushing S:', isPushing([KeyCodes.S, KeyCodes.K]))
        if ( isPushing(KeyCodes.Esc) ) setMenuOpen(!menuOpen) 
        
    })

    return <div>
        <Button size="middle" type="primary" title='菜单' onClick={() => setMenuOpen(!menuOpen)} style={{margin: '5px 5px 5px 5px'}} >=</Button>
        <Drawer
            title="Basic Drawer"
            placement='bottom'
            closable={false}
            onClose={() => setMenuOpen(false)}
            open={menuOpen}
        >
            <p>menuOpen: {menuOpen}</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    </div>
}

export default Menu