import { useState } from "react";
import { sendAiMessage } from "../src/Services/aiChatApi";
import "./AiChat.css";

function AiChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat(prev => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await sendAiMessage(userMsg.text);
      const aiMsg = { role: "ai", text: res.data.reply };
      setChat(prev => [...prev, aiMsg]);
    } catch {
      setChat(prev => [
        ...prev,
        { role: "ai", text: "⚠️ AI service not available right now." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="ai-chat-container">
      {/* HEADER */}
      <div className="ai-chat-header">
        🤖 AI Recharge Assistant
      </div>

      {/* CHAT BODY */}
      <div className="ai-chat-body">
        {chat.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role}`}>
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble ai typing">
            AI is typing<span>.</span><span>.</span><span>.</span>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="ai-chat-input">
        <textarea
          rows="2"
          placeholder="Ask about recharge plans, offers, validity..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default AiChat;
