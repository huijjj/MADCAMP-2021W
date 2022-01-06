import TextField from '@material-ui/core/TextField';

export default function RoomInput({ onRoomCreate, onRoomJoin }) {


    return (
        <div className="chat_form">
            <form onSubmit={onRoomCreate} style={{display: "flex"}}>
                <div className="room_name">
                <TextField
                    style={{ margin: "0 0 0 0.5rem" }}
                    name="room"
                    label="Room" />
                </div>
                <button>Join</button>
            </form>
        </div>
    );
}