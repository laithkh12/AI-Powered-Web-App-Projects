import { useEffect, useRef, useState, useMemo } from "react";
import Chat from "./chat.jsx";

const chatId = Date.now().toString();

export default function () {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        padding: "8px",
        boxSizing: "border-box"
      }}
    >
      <h1>Cloud Guitars</h1>
      <Chat chatId={chatId}></Chat>
    </div>
  );
}
