// import logo from './logo.svg';
import './App.css'
import Menu from './page/menu'
import {SceneWindow} from './threejspage'

const App = () => {

    return (
        <div className="App" style={{position: 'fixed', zIndex: 10001}}>
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}
            <SceneWindow></SceneWindow>
            <Menu></Menu>
            {/* <KeyMouseControl></KeyMouseControl> */}
            {/* <button >testBuuton</button> */}
        </div>

    )
}

export default App
