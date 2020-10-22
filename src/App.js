import React, { useState, useEffect } from 'react'
import { Button, List } from 'antd'
import './style.styl'

const { ipcRenderer } = window.require('electron')

function App() {

    const onReadDirReply = () => {
        // 选择目录
        ipcRenderer.on('readDir-reply', (event, result) => {
            if (!result.canceled) {
                console.log(result)
                setFileList(result.fileList)
            } else {
                console.log('取消选择操作。')
            }
        })
    }

    const readDir = (callback) => {
        ipcRenderer.send('readDir', '传递给主进程的参数')
    }

    const [fileList, setFileList] = useState([])

    // 防止ipcRenderer重复注册事件，导致重复执行
    useEffect(() => {
        onReadDirReply()
    }, [])

    return (
        <div className="App">
            <h1>This is Electron CRA App.</h1>
            <Button type="primary" onClick={readDir}>Button</Button>
            <List
                header={<div>文件列表：</div>}
                bordered
                dataSource={fileList}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </div>
    )
}

export default App
