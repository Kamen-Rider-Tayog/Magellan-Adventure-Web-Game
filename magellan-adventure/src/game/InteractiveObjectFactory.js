import InteractiveObject from './InteractiveObject';
import { ObjectType } from './ObjectType';
import MissionManager from './MissionManager';
import SceneOne from '../scenes/SceneOne';
import SceneTwo from '../scenes/SceneTwo';
import SceneThree from '../scenes/SceneThree';
import SceneFour from '../scenes/SceneFour';
import SceneFive from '../scenes/SceneFive';
import SceneSix from '../scenes/SceneSix';

const InteractiveObjectFactory = {
  createSceneObjects(sceneIndex, sceneCols) {
    switch (sceneIndex) {
      case 0: return this.createScene0Objects(sceneCols);
      case 1: return this.createScene1Objects();
      case 2: return this.createScene2Objects();
      case 3: return this.createScene3Objects();
      case 4: return this.createScene4Objects();
      case 5: return this.createScene5Objects();
      default: return [];
    }
  },

  createScene0Objects(sceneCols) {
    const middleStart = Math.floor(sceneCols / 2) - 2;
    
    const kingDialogues = [
      "Your Majesty, I believe I can find a new spice route by sailing west.",
      "A new spice route? Nonsense. I reject your proposal, Magellan.",
      "I have only served Portugal faithfully, sir.",
      "Enough. Leave before you test my patience."
    ];
    
    const speakers = ["Magellan", "King Manuel I", "Magellan", "King Manuel I"];
    
    const king = new InteractiveObject(
      middleStart + 1, 2,
      "King Manuel I",
      kingDialogues,
      ObjectType.NPC_KING,
      speakers
    );
    
    king.onComplete = () => {
      MissionManager.setTalkedToKingManuel(true);
      SceneOne.updateExitTiles();
    };
    
    return [king];
  },

  createScene1Objects() {
    const charlesDialogues = [
      "Your Majesty, I propose a voyage west to reach the Spice Islands under Spain's flag.",
      "But Magellan, you are Portuguese. Why should Spain trust you?",
      "I have sworn loyalty to Your Majesty. I offer my life in service to Spain.",
      "Very well. You shall command five ships under the Spanish crown."
    ];
    
    const speakers = ["Magellan", "King Charles V", "Magellan", "King Charles V"];
    
    const charles = new InteractiveObject(
      45, 45,
      "King Charles V",
      charlesDialogues,
      ObjectType.CHARLES,
      speakers
    );
    
    charles.onComplete = () => {
      MissionManager.setTalkedToKingCharles(true);
      SceneTwo.updateExitTile();
    };
    
    return [charles];
  },

  createScene2Objects() {
    const sailorDialogues = [
      "Captain, are we certain this Rio de la Plata is truly a strait?",
      "The men are growing restless with just this wide estuary.",
      "Stay the course. The true strait lies further south.",
      "Tell the men to maintain their discipline."
    ];
    
    const speakers = ["Crew Member", "Crew Member", "Magellan", "Magellan"];
    
    const sailor = new InteractiveObject(
      27, 23,
      "Crew Member",
      sailorDialogues,
      ObjectType.SAILOR1,
      speakers
    );
    
    sailor.onComplete = () => {
      MissionManager.setTalkedToSailor(true);
      SceneThree.updateExitTile();
    };
    
    return [sailor];
  },

  createScene3Objects() {
    const mutineerDialogues = [
      "We've had enough! This endless search... We're turning back!",
      "You dare challenge my authority?! This mutiny ends now!",
      "Your command is over! The men are with us!",
      "I will execute the ringleaders if I must. This voyage continues!"
    ];
    
    const speakers = ["Mutineer Captain", "Magellan", "Mutineer Captain", "Magellan"];
    
    const mutineer = new InteractiveObject(
      24, 24,
      "Mutineer Captain",
      mutineerDialogues,
      ObjectType.SAILOR2,
      speakers
    );
    
    mutineer.onComplete = () => {
      MissionManager.setDealtWithMutineers(true);
      SceneFour.updateExitTile(24, 20);
    };
    
    return [mutineer];
  },

  createScene4Objects() {
    const sailor1 = new InteractiveObject(
      15, 15,
      "Crew Member",
      ["Captain, provisions are gone. We're eating leather and sawdust."],
      ObjectType.SAILOR1
    );
    
    const sailor2 = new InteractiveObject(
      20, 18,
      "Sailor",
      ["Is there truly land ahead? Or is this another mirage?"],
      ObjectType.SAILOR2
    );
    
    sailor2.onComplete = () => {
      MissionManager.setTalkedToAllSailors(true);
      SceneFive.updateExitTile();
    };
    
    return [sailor1, sailor2];
  },

  createScene5Objects() {
    const humabonDialogues = [
      "Greetings! I am Magellan, a traveller from the northwest land.",
      "We come in peace. We seek friendship and trade.",
      "What are your intentions for coming here?",
      "We're here to introduce our culture and be friends.",
      "Welcome to our land, Magellan."
    ];
    
    const speakers = ["Magellan", "Magellan", "Rajah Humabon", "Magellan", "Rajah Humabon"];
    
    const humabon = new InteractiveObject(
      7, 9,
      "Rajah Humabon",
      humabonDialogues,
      ObjectType.SAILOR2,
      speakers
    );
    
    humabon.onComplete = () => {
      MissionManager.setTalkedToHumabon(true);
      SceneSix.updateExitTile(0, 32);
    };
    
    return [humabon];
  }
};

export default InteractiveObjectFactory;