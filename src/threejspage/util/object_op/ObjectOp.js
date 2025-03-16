import * as THREE from 'three'
import keyListener, { KeyCodes } from '../../../util/keycontrol/KeyListener'

// Create a simple table
function createTable(scene, position = { x: 0, y: 0, z: 0 }, size = { width: 1.9, height: 1.6, depth: 1.8 }) {
    // Table top
    const tableTopGeometry = new THREE.BoxGeometry(size.width, 0.1, size.depth)
    const tableTopMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }) // Brown wood color
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial)
    tableTop.position.set(position.x, position.y + size.height, position.z)
    tableTop.castShadow = true
    tableTop.receiveShadow = true
    
    // Table legs
    const legGeometry = new THREE.BoxGeometry(0.2, size.height, 0.2)
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })
    
    // Create 4 legs
    const legPositions = [
        { x: -size.width/2 + 0.2, z: -size.depth/2 + 0.2 },
        { x: size.width/2 - 0.2, z: -size.depth/2 + 0.2 },
        { x: -size.width/2 + 0.2, z: size.depth/2 - 0.2 },
        { x: size.width/2 - 0.2, z: size.depth/2 - 0.2 }
    ];
    
    const legs = []
    legPositions.forEach(legPos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial)
        leg.position.set(
            position.x + legPos.x, 
            position.y + size.height/2, 
            position.z + legPos.z
        )
        leg.castShadow = true
        scene.add(leg)
        legs.push(leg)
    })
    
    scene.add(tableTop)
    
    return { tableTop, legs }
}

// Create a simple chair
function createChair(scene, position = { x: 0, y: 0, z: 0 }, size = { width: 0.5, height: 0.4, depth: 0.5 }) {
    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(size.width, 0.1, size.depth)
    const seatMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }) // Brown wood color
    const seat = new THREE.Mesh(seatGeometry, seatMaterial)
    seat.position.set(position.x, position.y + size.height/2, position.z)
    seat.castShadow = true
    seat.receiveShadow = true
    
    // Chair legs
    const legGeometry = new THREE.BoxGeometry(0.15, size.height/2, 0.15)
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })
    
    // Create 4 legs
    const legPositions = [
        { x: -size.width/2 + 0.15, z: -size.depth/2 + 0.15 },
        { x: size.width/2 - 0.15, z: -size.depth/2 + 0.15 },
        { x: -size.width/2 + 0.15, z: size.depth/2 - 0.15 },
        { x: size.width/2 - 0.15, z: size.depth/2 - 0.15 }
    ];
    
    const legs = []
    legPositions.forEach(legPos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial)
        leg.position.set(
            position.x + legPos.x, 
            position.y + size.height/4, 
            position.z + legPos.z
        );
        leg.castShadow = true;
        scene.add(leg)
        legs.push(leg)
    });
    
    // Chair back
    const backGeometry = new THREE.BoxGeometry(size.width, size.height/2, 0.1)
    const backMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })
    const back = new THREE.Mesh(backGeometry, backMaterial)
    back.position.set(
        position.x, 
        position.y + size.height/2 + size.height/4, 
        position.z + size.depth/2 - 0.05
    );
    back.castShadow = true
    back.receiveShadow = true
    
    scene.add(seat)
    scene.add(back)
    
    return { seat, legs, back }
}

// Create a computer monitor with responsive text
function createComputer(scene, position = { x: 0, y: 0, z: 0 }, text = "Hello World") {
    // Monitor base
    const baseGeometry = new THREE.BoxGeometry(1, 0.1, 0.8)
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.set(position.x, position.y, position.z)
    base.castShadow = true
    
    // Monitor stand
    const standGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
    const standMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 })
    const stand = new THREE.Mesh(standGeometry, standMaterial)
    stand.position.set(position.x, position.y, position.z)
    stand.castShadow = true
    
    // Monitor screen
    const screenGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.1);
    const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 })
    const screen = new THREE.Mesh(screenGeometry, screenMaterial)
    screen.position.set(position.x, position.y + 0.8, position.z)
    screen.castShadow = true;
    
    // Screen display area
    const displayGeometry = new THREE.PlaneGeometry(2, 1.2)
    const displayMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000080,  // Dark blue background
    })
    const display = new THREE.Mesh(displayGeometry, displayMaterial)
    display.position.set(position.x, position.y + 0.8, position.z + 0.06)
    
    // Text on screen
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 512
    canvas.height = 256
    context.fillStyle = '#000080'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.font = '24px monospace'
    context.fillStyle = '#ffffff'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, canvas.width / 2, canvas.height / 2)
    
    const textTexture = new THREE.CanvasTexture(canvas)
    const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture })
    const textGeometry = new THREE.PlaneGeometry(2, 1.2)
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textMesh.position.set(position.x, position.y + 0.8, position.z + 0.07)
    
    // Update text function
    const updateText = (newText) => {
        context.fillStyle = '#000080'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.font = '24px monospace'
        context.fillStyle = '#ffffff'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(newText, canvas.width / 2, canvas.height / 2)
        textTexture.needsUpdate = true
    };
    
    scene.add(base)
    scene.add(stand)
    scene.add(screen)
    scene.add(display)
    scene.add(textMesh)
    
    return updateText
}

function createKeyboard(scene, animateActions, position = { x: 0, y: 0, z: 0 }) {
    // 创建一个组用来存放所有键
    const keyboard = new THREE.Group();

    // 定义四行键盘，每行对应真实的字母排列
    const rows = [
        [
            { '`': KeyCodes.Backquote }, { '1': KeyCodes['1'] }, { '2': KeyCodes['2'] },
            { '3': KeyCodes['3'] }, { '4': KeyCodes['4'] }, { '5': KeyCodes['5'] },
            { '6': KeyCodes['6'] }, { '7': KeyCodes['7'] }, { '8': KeyCodes['8'] },
            { '9': KeyCodes['9'] }, { '0': KeyCodes['0'] }, { '-': KeyCodes.Minus },
            { '=': KeyCodes.Equal }, { 'Backspace': KeyCodes.Backspace }
        ],
        [
            { 'Tab': KeyCodes.Tab }, { 'Q': KeyCodes.Q }, { 'W': KeyCodes.W },
            { 'E': KeyCodes.E }, { 'R': KeyCodes.R }, { 'T': KeyCodes.T },
            { 'Y': KeyCodes.Y }, { 'U': KeyCodes.U }, { 'I': KeyCodes.I },
            { 'O': KeyCodes.O }, { 'P': KeyCodes.P }, { '[': KeyCodes.BracketLeft },
            { ']': KeyCodes.BracketRight }, { '\\': KeyCodes.Backslash }
        ],
        [
            { 'CapsLock': KeyCodes.CapsLock }, { 'A': KeyCodes.A }, { 'S': KeyCodes.S },
            { 'D': KeyCodes.D }, { 'F': KeyCodes.F }, { 'G': KeyCodes.G },
            { 'H': KeyCodes.H }, { 'J': KeyCodes.J }, { 'K': KeyCodes.K },
            { 'L': KeyCodes.L }, { ';': KeyCodes.Semicolon }, { '\'': KeyCodes.Quote },
            { 'Enter': KeyCodes.Enter }
        ],
        [
            { 'Shift': KeyCodes.ShiftLeft }, { 'Z': KeyCodes.Z }, { 'X': KeyCodes.X },
            { 'C': KeyCodes.C }, { 'V': KeyCodes.V }, { 'B': KeyCodes.B },
            { 'N': KeyCodes.N }, { 'M': KeyCodes.M }, { ',': KeyCodes.Comma },
            { '.': KeyCodes.Period }, { '/': KeyCodes.Slash }, { 'ShiftR': KeyCodes.ShiftRight }
        ]
    ]

    // 定义指法颜色映射
    const fingerColorMap = {
        'left-pinky': '#FA0000', // 左手小指，红色
        'left-ring': '#00FB00',  // 左手无名指，绿色
        'left-middle': '#0000FF', // 左手中指，蓝色
        'left-index': '#FFA000',  // 左手食指，黄色
        'right-index': '#FF0000', // 右手食指，橙色
        'right-middle': '#800080', // 右手中指，紫色
        'right-ring': '#008080',  // 右手无名指，青绿色
        'right-pinky': '#808080'  // 右手小指，灰色
    }

    // 定义按键指法映射
    const keyFingerMap = {
        '`': 'left-pinky', '1': 'left-pinky', '2': 'left-ring', '3': 'left-middle',
        '4': 'left-index', '5': 'left-index', '6': 'right-index', '7': 'right-index',
        '8': 'right-middle', '9': 'right-ring', '0': 'right-pinky', '-': 'right-pinky',
        '=': 'right-pinky', 'Backspace': 'right-pinky', 'Tab': 'left-pinky',
        'Q': 'left-pinky', 'W': 'left-ring', 'E': 'left-middle', 'R': 'left-index',
        'T': 'left-index', 'Y': 'right-index', 'U': 'right-index', 'I': 'right-middle',
        'O': 'right-ring', 'P': 'right-pinky', '[': 'right-pinky', ']': 'right-pinky',
        '\\': 'right-pinky', 'CapsLock': 'left-pinky', 'A': 'left-pinky',
        'S': 'left-ring', 'D': 'left-middle', 'F': 'left-index', 'G': 'left-index',
        'H': 'right-index', 'J': 'right-index', 'K': 'right-middle', 'L': 'right-ring',
        ';': 'right-pinky', '\'': 'right-pinky', 'Enter': 'right-pinky',
        'Shift': 'left-pinky', 'Z': 'left-pinky', 'X': 'left-ring',
        'C': 'left-middle', 'V': 'left-index', 'B': 'left-index', 'N': 'right-index',
        'M': 'right-index', ',': 'right-middle', '.': 'right-ring', '/': 'right-pinky',
        'ShiftR': 'right-pinky'
    }

    // 定义键的尺寸和间距
    const keyWidth = 0.12 // 增大宽度
    const keyHeight = 0.08 // 增大高度
    const keyDepth = 0.12 // 增大深度
    const spacing = 0.01 // 适当增大间距

    // 每一行创建对应的键
    rows.forEach((row, rowIndex) => {
        // 计算当前行的总宽度，用来居中排列
        const rowLength = row.length
        const totalRowWidth = rowLength * keyWidth + (rowLength - 1) * spacing
        let offsetX = -totalRowWidth / 2

        row.forEach(key => {
            const keyValue = Object.keys(key)[0]
            const keyCode = Object.values(key)[0]

            // 创建键的几何体和材质
            const geometry = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth)

            // 根据指法设置默认颜色
            const finger = keyFingerMap[keyValue]
            const defaultColor = fingerColorMap[finger]

            // Text on key
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = 256
            canvas.height = 128
            context.fillStyle = defaultColor
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.font = '64px monospace'
            context.fillStyle = '#ffffff'
            context.shadowColor = '#000000'; // 添加文字阴影，增强对比度
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(keyValue, canvas.width / 2, canvas.height / 2)

            const textTexture = new THREE.CanvasTexture(canvas)
            
            const textMaterial = new THREE.MeshBasicMaterial({ color: defaultColor, map: textTexture })
            const keyMesh = new THREE.Mesh(geometry, textMaterial)

            // 设置位置，x方向逐行前移
            keyMesh.position.set(offsetX + keyWidth / 2, 0.01, rowIndex * (keyDepth + spacing) - 0.2)
            // 把键名保存到对象的 name 属性中，用于标识
            keyMesh.name = keyCode

            keyboard.add(keyMesh)
            offsetX += keyWidth + spacing
        })
    })

    keyboard.position.set(position.x, position.y, position.z)

    const baseGeometry = new THREE.BoxGeometry(1.9, 0.02, 0.6)
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.set(position.x, position.y, position.z)
    base.castShadow = true

    scene.add(base)
    scene.add(keyboard)

    // 在动画帧中检测各个键是否被按下，并更新颜色
    animateActions.push(() => {
        keyboard.children.forEach(keyMesh => {
            // 这里直接调用 keyListener 的 isPushing 方法，传入键名即可
            if (keyListener.isPushing(keyMesh.name)) {
                //如果该键被按下，则变为红色且高度缩小
                keyMesh.material.color.set(0xff0000)
                keyMesh.scale.y = keyHeight * 0.01
                keyMesh.position.y = 0.01
            } else {
                // 否则恢复为默认灰色
                keyMesh.material.color.set(0xaaaaaa)
                keyMesh.scale.y = keyHeight
                keyMesh.position.y = 0.01
            }
        })
    })

    return keyboard
}

export { createTable, createChair, createComputer, createKeyboard }