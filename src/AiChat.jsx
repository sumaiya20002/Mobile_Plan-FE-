import { useState } from "react";
import { sendAiMessage } from "../src/Services/aiChatApi";

function AiChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim() === "") return;

    setLoading(true);
    try {
      const res = await sendAiMessage(message);
      setReply(res.data.reply);
      console.log(res.data.reply);
      
    } catch (error) {
      setReply("AI service not available");
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h3>AI Recharge Assistant</h3>

      <textarea
        rows="4"
        placeholder="Ask about recharge plans..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={handleSend}
        style={{ width: "100%", marginTop: "10px" }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div style={{ marginTop: "15px", background: "#f2f2f2", padding: "10px" }}>
          <b>AI:</b>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default AiChat;
