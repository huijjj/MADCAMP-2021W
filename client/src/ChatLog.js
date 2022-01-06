import './ChatLog.css';

function ChatLog({ chats, scrollRef }) {
    const renderChat = () => chats.map(({ name, msg }, index) => (
        <div key={index}>
          <h3>{name}: <span>{msg}</span></h3>
        </div>
      ));

    return (
        <div className="ChatLog">
            {renderChat()}
            <div style={{ float: "left", clear: "both" }} ref={scrollRef} />
        </div>
    );
}

export default ChatLog;