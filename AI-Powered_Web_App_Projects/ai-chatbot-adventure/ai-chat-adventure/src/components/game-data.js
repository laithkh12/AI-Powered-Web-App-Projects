const gameData = {
  locations: [
    {
      id: "1",
      description:
        "You see a bar to the north, a shop to the west and a security robot, guarding the exit to the east.",
      exitEast: "2",
      npcs: [
        {
          id: "security-robot",
          name: "Security Robot"
        }
      ],
      getAvailableNpcs(gameRuntimeData) {
        const quest = gameRuntimeData.quests.find(
          (quest) => quest.id === "learnHowToGetPastARobot"
        );

        return quest.completed ? ["security-robot"] : [];
      },
      onBeforeExitEast(gameRuntimeData) {
        const quest = gameRuntimeData.quests.find((quest) => quest.id === "trickRobot");

        return {
          ok: quest.completed,
          notOkText: "The robot asks for a passcode before letting you pass."
        };
      },
      exitNorth: "3",
      exitWest: "4"
    },
    {
      id: "2",
      description:
        "You are standing in front of a large company building. The inscription above the entrance reads 'OmniCorp'.",
      exitEast: "3"
    },
    {
      id: "3",
      description: `You walk into the bar and immediately see the counter and the bartender behind it. 
The bar is not very crowded and there are only 3 other guests here.`,
      npcs: [
        {
          id: "bartender",
          name: "Bartender"
        },
        {
          id: "dr-owen",
          name: "Dr. Owen"
        }
      ],
      getAvailableNpcs(gameRuntimeData) {
        const quest = gameRuntimeData.quests.find(
          (quest) => quest.id === "buyDrOwenDrink"
        );

        return quest.completed ? ["bartender", "dr-owen"] : ["bartender"];
      },
      exitSouth: "1"
    },
    {
      id: "4",
      description:
        "The shop sells tech equipment like quantum computers, holo projectors and laser knifes. There is a clerk behind the counter."
    }
  ]
};

export default gameData;
