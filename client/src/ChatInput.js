import TextField from '@material-ui/core/TextField';

export default function ChatInput({ onMsgSubmit }) {
    return (
        <form className="chat_form" onSubmit={onMsgSubmit}>
            <div className="chat_name">
            <TextField 
                name="name"
                label="Name" />
            </div>
            <div className="chat_msg">
            <TextField
                name="msg"
                label="Message" />
            </div>
            <button>Send</button>
      </form>

    );
}
