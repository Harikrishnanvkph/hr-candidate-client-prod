import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";
import './messages.css'
import { useSelector } from "react-redux";
import JBMessages_MSG from './JBMessage_MSG.jsx'


export default function JBMessages(){
    const user_id = useSelector((state) => state.myStore.userSocket);
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('search')
    const [currentConversation, setCurrentConversation] = useState(null);
    const [endReceivers, setEndReceivers] = useState([]);
    const [rcv, setRCV] = useState('')
    const [ws, setWS] = useState(null)
    const [receiverSocketID, setReceiverSocketID] = useState(null)
    const [searchedUsers, setSearchedUsers] = useState([])

    useEffect(()=>{
        // const inp = document.querySelector('#search-type-search');
        // inp.checked = true;
        const createSocketIO = async()=>{
            const socketIO = io("http://localhost:3000",{
                path : "/socket"
            })

            setWS(socketIO);

            socketIO.on('connect',()=>{
                // console.log('socket.io connection established ',user_id.uuid)
                socketIO.emit('initialize',user_id.uuid);
            })

            socketIO.on('disconnect',()=>{
                // console.log('socket.io connection terminated')
            })

            socketIO.on('message-user',(obj)=>{
                const {message, by} = obj;

                setCurrentConversation((prevstate)=>{
                    return (prevstate.receiver.uuid === by.uuid || prevstate.sender.uuid === by.uuid) ?
                        {
                            ...prevstate,
                            messages : [...prevstate.messages,{
                                content : message,
                                sender : by.name,
                                timestamp: Date.now()
                            }]
                        } : prevstate
                })
            })
        }

        const getConversation = async()=>{
            const conversations = await axios.post(
                'http://localhost:3000/js/Messages/getConversation',
                {
                    user_uuid : user_id.uuid
                },
                {
                    headers : {
                        'Content-Type' : "application/json"
                    }
                }
            )
            setEndReceivers(conversations.data);
        }

        async function init(){
            await createSocketIO();
            await getConversation();
        }

        init().catch(/*doing nothing */)

    },[])

    const fetchMessage = async(sender_uuid,receiver_uuid)=>{
        console.log('hi')
        if(currentConversation && (Number(receiver_uuid) === Number(currentConversation.receiver.uuid))){
            console.log(sender_uuid,receiver_uuid)
            return;
        }
        const getReceiverSocketID = await axios.post(
            'http://localhost:3000/js/Messages/getSocketId',
            {
                uuid : Number(receiver_uuid)
            }
        )
        setReceiverSocketID(getReceiverSocketID.data.socketId)
        const msg = await axios.post('http://localhost:3000/js/Messages/getCnvWithConversationId',
            {
                sender_uuid : sender_uuid,
                receiver_uuid : receiver_uuid
            },
            {
                'Content-Type' : 'application/json'
            }
        )
        setCurrentConversation(msg.data)
    }

    const fetchNewMessage = async(sender,receiver)=>{
        const createConversation = await axios.post(
            "http://localhost:3000/js/Messages/createConversation",
            {
                sender : sender,
                receiver : receiver
            }
        )
        if(createConversation.data){
            alert(`conversation Created or Added\nselect 'search' radio button for more info`)
            setSearchType("add")
            setCurrentConversation(createConversation.data)
            delete createConversation.data.messages
            setEndReceivers((prevstate)=>[...prevstate,createConversation.data])
            setRCV(receiver.firstName)
        }

    }

    const sendOperation = (message)=>{
        ws.emit('chat-user',{
            receiverSocketID : receiverSocketID,
            message : message,
            sender : user_id.uuid,
            sender_name : user_id.name,
            receiver : currentConversation.receiver.uuid === user_id.uuid ?
                currentConversation.sender.uuid : currentConversation.receiver.uuid
        })
    }

    const handleInput = async(e)=>{
        if(searchType === "add"){
            console.log('d')
            if(e.target.value !== "" && e.target.value.trim() !== ""){
                setSearch(e.target.value)
                const addUsers = await axios.post(
                    'http://localhost:3000/js/Messages/search',
                    {
                        name : e.target.value
                    }
                )
                setSearchedUsers(addUsers.data)
            }else{
                setSearchedUsers([])
                setSearch(e.target.value)
            }
        }else{
            setSearch(e.target.value)
        }
    }

    return<>
        <div className="chat-window">
            <div className="chat-window-sidebar">
                <div className='chat-input-field'>
                    <input type='text' placeholder='Search User' value={search} onChange={handleInput}/>
                    <div className='chat-radio'>
                        <label htmlFor='search-type-search'>
                            <input type='radio' name='search-type' id='search-type-search'
                                  value="search" checked={searchType === "search"}
                                   onChange={() => setSearchType("search")}/>
                            Search
                        </label>
                        <label htmlFor='search-type-add' >
                            <input type='radio' name='search-type' id='search-type-add'
                                   value="add" checked={searchType === "add"}
                                   onChange={() => setSearchType("add")}/>
                            Add
                        </label>
                    </div>
                </div>
                <div className="chat-window-sidebar-users">
                    <div>
                        {
                            searchType==='search' ?
                                endReceivers.length > 0 ? endReceivers?.map((cnv,index)=>{
                                let receiver;
                                const user = (() => {
                                    if (cnv.sender.uuid === user_id.uuid) {
                                        receiver = Number(cnv.receiver.uuid);
                                        return cnv.receiver.name;
                                    } else if (user_id.uuid === cnv.receiver.uuid) {
                                        receiver = Number(cnv.sender.uuid);
                                        return cnv.sender.name;
                                    } else {
                                        return null;
                                    }
                                })();
                                if(user && (user.toLowerCase().startsWith(search.toLowerCase()))){
                                    return <div key={index} className='receiver-tag'
                                                onClick={()=>{
                                                    setRCV(user);
                                                    fetchMessage(user_id.uuid, receiver).catch()
                                                }}>
                                        {user}
                                    </div>
                                }else{
                                    return null
                                }
                            }) : null  : searchedUsers.length > 0 ?
                                searchedUsers?.map((src,index)=>{
                                    let flag = false
                                    if(Number(src.uuid) === Number(user_id.uuid)){
                                        flag = true
                                    }else if(endReceivers?.length > 0){
                                        for(let a of endReceivers){
                                            console.log(Number(src.uuid),a,user_id.uuid)
                                            if(Number(src.uuid) === Number(a.sender.uuid)  ||
                                                Number(src.uuid) === Number(a.receiver.uuid)){
                                                flag = true
                                                break
                                            }
                                        }
                                    }
                                    return !flag ? <div key={index} className='receiver-tag'
                                                onClick={()=>{
                                                    setRCV(src.name);
                                                    fetchNewMessage(user_id, src).catch()
                                                }}>
                                        {src.name}
                                    </div> : null
                                }) : <div>Search For More</div>
                        }
                    </div>
                </div>
            </div>
            <JBMessages_MSG conversation={currentConversation} receiver={rcv}
                handleSend={sendOperation} />
        </div>
    </>
}
