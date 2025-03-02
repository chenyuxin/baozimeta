import { useEffect } from 'react'
import keyListener, { KeyListener, KeyCodes } from '../KeyListener'

/**
 * 检查Key是否按下
 * @param {Function} keyChangedCallback 
 */
const useKeyChanged = (keyChangedCallback) => {
    useEffect(() => {
        const handler = () => {
            keyChangedCallback(pushKeyCodes => keyListener.isPushing(pushKeyCodes))
        }
        keyListener.eventTarget.addEventListener(KeyListener.keydown, handler)
        return () => {
            keyListener.eventTarget.removeEventListener(KeyListener.keydown, handler)
        }
    },[keyChangedCallback])
}

export default useKeyChanged
export { KeyCodes }