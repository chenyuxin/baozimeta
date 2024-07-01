import { Button, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import keyListener from '../../util/keycontrol/KeyListener'

const Menu = (_props) => {

    const [menuOpen,setMenuOpen] = useState(false) 

    const handleKeyChanged = (_event) => {
        // console.log(_event.detail,keyListener.isKeyDown)
        // console.log('menuOpen:', menuOpen, 'Escape:', keyListener.isPushing('Escape'))
        if ( keyListener.isPushing('Escape') ) {
            setMenuOpen(!menuOpen)
        }
    }

    useEffect(() => {
        keyListener.eventTarget.addEventListener('keydown', handleKeyChanged)
        
        return () => {
            keyListener.eventTarget.removeEventListener('keydown', handleKeyChanged)
        }
        
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