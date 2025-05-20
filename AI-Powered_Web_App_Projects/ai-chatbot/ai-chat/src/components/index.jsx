import { useEffect, useRef, useState, useMemo } from "react";

const chatId = Date.now().toString();

export default function () {
  const messageInput = useRef();
  const [pending, setPending] = useState();
  const [messages, setMessages] = useState([]);

  return (
    <div
      style={{
        flex: 1,
        minHeight: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        padding: "8px",
        boxSizing: "border-box",
        gap: "4px",
      }}
    >
      <div
        id="chat"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflow: "auto",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              borderRadius: "4px",
              padding: "4px",
              backgroundColor: index % 2 === 0 ? "#80c7ff" : "#7ccf4a",
            }}
          >
            {message}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}></div>
      <div disabled={pending}>
        <input
          style={{ width: "400px", marginRight: "4px" }}
          ref={messageInput}
          type="text"
          disabled={pending}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        ></input>
        <button
          disabled={pending}
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );

  async function sendMessage() {
    const input = messageInput.current.value;
    messageInput.current.value = "";

    const newMessages = [...messages, input];
    setMessages(newMessages);
    setPending(true);

    const response = await fetch(`/api/chat?msg=${input}&id=${chatId}`);
    const answerObj = await response.json();
    console.log(answerObj.answer);

    setMessages([...newMessages, answerObj.answer.content]);

    setPending(false);
  }
}
