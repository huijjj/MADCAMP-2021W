import React, { useEffect } from 'react';

export default function RoomList({ roomList }) {
    useEffect(() => {
        console.log(roomList);
    }, [roomList]);


    const renderRoom = () => (
        roomList?.map(({ key, participants }) => (
            <div key={key}>name: {key}({participants})</div>
        ))
    );

    return (
        <div className="RoomList">{renderRoom()}</div>
    );
}