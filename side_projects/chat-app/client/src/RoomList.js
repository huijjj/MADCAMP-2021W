import React, { useEffect } from 'react';
import './RoomList.css';

export default function RoomList({ roomList, onRoomSelect }) {
    useEffect(() => {
        console.log(roomList);
    }, [roomList]);


    const renderRoom = () => (
        roomList?.map(({ key, participants }) => (
            <div onClick={() => onRoomSelect(key)} className="roomItem" key={key}>name: {key}({participants})</div>
        ))
    );

    return (
        <div className="RoomList">{renderRoom()}</div>
    );
}