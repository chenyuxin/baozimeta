import { Button, Drawer } from 'antd'
import React, { useState } from 'react'
import useKeyChanged, { KeyCodes } from '../../util/keycontrol/reactcontrol/ReKeyListener'
// import LoginPage from '../sso/LoginPage'

const Menu = _props => {

    const [menuOpen,setMenuOpen] = useState(false) 

    useKeyChanged(isPushing => {
        if (isPushing(KeyCodes.Esc)) setMenuOpen(prev=>!prev) 
        if (isPushing([KeyCodes.CtrlLeft,KeyCodes.S])) { 
            console.log('push: Ctrl+S') 
        }    
        
    })

    return <div>
        <Button size="middle" type="primary" title='菜单' onClick={()=>setMenuOpen(prev=>!prev)} style={{margin: '5px 5px 5px 5px'}} >=</Button>
        <Drawer
            title="Basic Drawer"
            placement='bottom'
            closable={false}
            onClose={() => setMenuOpen(()=>false)}
            open={menuOpen}
        >
            <p>menuOpen: {menuOpen}</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
        {/* <Modal open={menuOpen} onClose={() => setMenuOpen(()=>false)}>
            <LoginPage />
        </Modal> */}
    </div>
}

export default Menu