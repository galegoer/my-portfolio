import '../styles/JoinRoom.css';
import { useState } from 'react';

import io from 'socket.io-client';
import Form from 'react-bootstrap/Form';
import Chat from './Chat';
const socket = io.connect("http://localhost:3000");

function JoinRoom() {

    const [userName, setUsername] = useState("");
    const [room, setRoom] = useState(0);
    const [errorMessage, setErrorMessage] = useState(false);
    const [chatVisible, setVisible] = useState(false);

    // let navigate = useNavigate();

    const joinRoom = () => {
        let roomNum = document.getElementById("form-select-room").value;
        setRoom(roomNum);
        console.log(roomNum);
        if (!userName) {
            setErrorMessage(true);
            return;
        }
        setVisible(true);
        socket.emit('join_room', roomNum);
        // navigate(`/chat/${room}`, {state: {userName: userName}} );
    };

    return (
        <div className="App">
            {/* <header className="App-header"> */}
            {/* </header> */}

            {/* TO DO CHECK AND RETURN ACTIVE ROOMS EVERY SO OFTEN*/}
            <h3>Active Rooms: TO DO</h3>
            {/* {io.sockets.adapter.rooms.map ( e => 
            <div style={{color:'green'}}>{e}</div>
            )} */}
            {!chatVisible ? ( 
                <div className="joinChatContainer">
                    <h3>Join A Chat Room</h3>
                    {errorMessage ? 
                        <h4 style={{'color': 'red'}}>Enter a Username first...</h4> : <></>
                    }
                    <input
                    type="text"
                    placeholder="Enter Username..."
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    />
                    <Form.Select id="form-select-room">
                        <option value="1">Room 1</option>
                        <option value="2">Room 2</option>
                        <option value="3">Room 3</option>
                        <option value="4">Room 4</option>
                        <option value="5">Room 5</option>
                    </Form.Select>

                    <button onClick={() => joinRoom()}>Join A Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={userName} room={room} />
            )}
        </div>
    );
}

export default JoinRoom;
