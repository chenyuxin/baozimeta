import keyListener, { KeyCodes } from '../../util/keycontrol/KeyListener';

// 生成随机的250个字符的关卡文本
const generateLevelText = () => {
    // 扁平化 keys 数组，提取其中的字符
    const flatKeys = [];
    keys.forEach(row => {
        row.forEach(keyObj => {
            const key = Object.keys(keyObj)[0];
            flatKeys.push(key);
        });
    });

    let text = '';
    for (let i = 0; i < 250; i++) {
        const randomIndex = Math.floor(Math.random() * flatKeys.length);
        text += flatKeys[randomIndex];
    }
    return text;
}

// 定义四行键盘，每行对应真实的字母排列
const keys = [
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
        { 'Z': KeyCodes.Z }, { 'X': KeyCodes.X },
        { 'C': KeyCodes.C }, { 'V': KeyCodes.V }, { 'B': KeyCodes.B },
        { 'N': KeyCodes.N }, { 'M': KeyCodes.M }, { ',': KeyCodes.Comma },
        { '.': KeyCodes.Period }, { '/': KeyCodes.Slash }
    ]
]


/**
 * 打字练习
 */
export const gameTypingDxerciseBegin = (scene, camera, intervalActions, updateText) => {
    // 初始化关卡文本和用户输入信息
    let levelText = generateLevelText();
    let currentIndex = 0;
    let correctCount = 0;
    let startTime = Date.now();

    // 更新文本显示
    const updateDisplayText = () => {
        const beforeText = levelText.slice(0, currentIndex);
        const currentChar = levelText[currentIndex];
        const afterText = levelText.slice(currentIndex + 1);
        const displayText = `${beforeText}<span style="color: red;">${currentChar}</span>${afterText}`;
        updateText(displayText);
    };

    // 处理键盘输入事件
    const handleKeyPress = () => {
        if (keyListener.isPushing(levelText[currentIndex])) {
            correctCount++;
            currentIndex++;
            if (currentIndex === 250) {
                // 关卡结束，计算准确率和用时
                const endTime = Date.now();
                const totalTime = (endTime - startTime) / 1000;
                const accuracy = (correctCount / 250) * 100;

                // 显示准确率和用时
                updateText(`Accuracy: ${accuracy.toFixed(2)}% Time: ${totalTime.toFixed(2)}s`);

                // 重置关卡信息
                levelText = generateLevelText();
                currentIndex = 0;
                correctCount = 0;
                startTime = Date.now();

            } else {
                updateDisplayText();
            }
        }
    };

    // 初始化文本显示
    updateDisplayText()

    intervalActions.push(()=>{
        handleKeyPress()
    })


}



