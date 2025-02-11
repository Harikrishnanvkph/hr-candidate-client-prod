import {useState, memo, useEffect} from 'react'

function JBMessages_MSG({conversation,receiver, handleSend}){
    const [userMessage, setUserMessage] = useState('')

    const handleMessageSend = ()=>{
        if(userMessage !== "" && userMessage.trim() !== ""){
            handleSend(userMessage.trim())
            setUserMessage("")
        }
        setUserMessage("")
    }

    return <>
        <div className="chat-window-user-chat">
            <div className="header">{receiver ? receiver : 'No User'}</div>
            <div className="message-body">
                {
                    conversation && conversation.messages.length > 0 ?
                        conversation?.messages.map((msg,index)=> {
                            const place = receiver === msg.sender ? 'message-body-container-left' :
                                'message-body-container-right'
                            return <div className={`message-body-container ${place}`} key={index}>
                                <div className="message-body-container-box">
                                    <div className={`message-sender ${place}`}>{msg.sender}</div>
                                    <div className={`${place}`}>
                                        <p className='message-content'>{msg.content}</p>
                                    </div>
                                </div>
                            </div>
                        }) : <img className="chatimage" src="/chat_backend.png"  alt={'chat image'}/>
                }
            </div>
            <div className="userinputsection">
                <input type="text" placeholder="enter your message" value={userMessage} onChange={(e)=>{
                    setUserMessage(e.target.value)
                }} />
                <button onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    </>
}

export default memo(JBMessages_MSG)
