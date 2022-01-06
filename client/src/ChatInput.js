import TextField from '@material-ui/core/TextField';

export default function ChatInput({ onMsgSubmit, onChangeRoom }) {
    return (
        <div className="chat_form">
            <form className="chat_form" onSubmit={onMsgSubmit}>
                <div className="chat_name">
                <TextField 
                    style={{ margin: "0 0 0 0.5rem" }}
                    name="name"
                    label="Name" />
                </div>
                <div className="chat_msg">
                <TextField
                    style={{ margin: "0 0 0 0.5rem" }}
                    name="msg"
                    label="Message" />
                </div>
                <button>Send</button>
            </form>
            <button style={{ margin: "0 0 0 0.5rem" }} onClick={onChangeRoom}>ChangeRoom</button>
        </div>
    );
}
