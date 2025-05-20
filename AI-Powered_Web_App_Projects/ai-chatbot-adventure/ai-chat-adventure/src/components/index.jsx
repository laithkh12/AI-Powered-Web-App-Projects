import { useEffect, useRef, useState, useMemo } from "react";
import gameData from "./game-data.js";
import Chat from "./chat.jsx";

const gameRuntimeData = {
  quests: [
    {
      id: "learnHowToGetPastARobot",
      completed: false
    },
    {
      id: "buyDrOwenDrink",
      completed: false
    },
    {
      id: "trickRobot",
      completed: false
    }
  ]
};

export default function () {
  const [currentLocationId, setCurrentLocationId] = useState("1");
  const [gameMessage, setGameMessage] = useState("");
  const [chatting, setChatting] = useState(false);
  const [chatId, setChatId] = useState(Date.now().toString());
  const [talkToNpc, setTalkToNpc] = useState("");

  const currentLocation = gameData.locations.find((loc) => loc.id === currentLocationId);

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
      <div id="room-description" style={{ height: "150px" }}>
        <div>{currentLocation.description}</div>
      </div>

      <div
        id="commands"
        style={{
          display: "flex",
          gap: "8px",
          pointerEvents: chatting ? "none" : "all",
          opacity: chatting ? "0.5" : "1"
        }}
      >
        <div style={{ display: "flex", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              disabled={
                !(
                  currentLocation.getAvailableNpcs &&
                  currentLocation.getAvailableNpcs(gameRuntimeData).length > 0
                )
              }
              onClick={() => {
                const currentTalkToNpc = talkToNpc || currentLocation.npcs[0].id;
                setTalkToNpc(currentTalkToNpc);

                startChat(currentTalkToNpc);
              }}
            >
              Talk to
            </button>
            <select
              disabled={!(currentLocation.npcs?.length > 0)}
              onChange={(event) => {
                setTalkToNpc(event.target.value);
              }}
            >
              {currentLocation.npcs?.map(
                (npc) =>
                  currentLocation.getAvailableNpcs &&
                  currentLocation.getAvailableNpcs(gameRuntimeData).includes(npc.id) && (
                    <option key={npc.id} value={npc.id}>
                      {npc.name}
                    </option>
                  )
              )}
            </select>
          </div>
          <button>Take</button>
          <button>Use</button>
        </div>
        <div
          id="nav-commands"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <button
            disabled={!currentLocation.exitNorth}
            onClick={() => {
              gotoLocation(currentLocation.exitNorth);
            }}
          >
            Go north
          </button>

          <div style={{ display: "flex" }}>
            <button disabled={!currentLocation.exitWest}>Go west</button>

            <button
              disabled={!currentLocation.exitEast}
              onClick={() => {
                const beforeCheck =
                  currentLocation.onBeforeExitEast &&
                  currentLocation.onBeforeExitEast(gameRuntimeData);

                if (beforeCheck?.ok) {
                  gotoLocation(currentLocation.exitEast);
                } else {
                  setGameMessage(beforeCheck.notOkText);
                }
              }}
            >
              Go east
            </button>
          </div>

          <button
            disabled={!currentLocation.exitSouth}
            onClick={() => {
              gotoLocation(currentLocation.exitSouth);
            }}
          >
            Go south
          </button>
        </div>
      </div>

      <div>{gameMessage}</div>

      {chatting && (
        <Chat
          chatId={chatId}
          talkTo={talkToNpc}
          gameRuntimeData={gameRuntimeData}
          endConversation={() => {
            setChatting(false);
          }}
        ></Chat>
      )}
    </div>
  );
  function gotoLocation(location) {
    setTalkToNpc("");
    setGameMessage("");
    setCurrentLocationId(location);
  }

  function startChat(talkTo) {
    setChatting(true);
    setChatId(Date.now().toString());

    setGameMessage(
      `You are talking to ${currentLocation.npcs.find((npc) => npc.id === talkTo).name}`
    );
  }
}
