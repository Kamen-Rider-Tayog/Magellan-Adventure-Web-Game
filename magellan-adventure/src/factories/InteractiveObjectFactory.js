import { InteractiveObject } from '../models/InteractiveObject';
import { ObjectType } from '../types/ObjectType';
import { MissionManager } from '../managers/MissionManager';

export class InteractiveObjectFactory {
  static createSceneObjects(sceneIndex, sceneCols) {
    switch (sceneIndex) {
      case 0: return this.createScene0Objects(sceneCols);
      case 1: return this.createScene1Objects();
      case 2: return this.createScene2Objects();
      case 3: return this.createScene3Objects();
      case 4: return this.createScene4Objects();
      case 5: return this.createScene5Objects();
      default: return [];
    }
  }

  static createScene0Objects(sceneCols) {
    const middleStart = Math.floor(sceneCols / 2) - 2;
    
    const kingDialogues = [
      "Your Majesty, I believe I can find a new spice route by sailing west, a faster path to the Indies.",
      "A new spice route? Nonsense. I reject your proposal, Magellan. You're already suspected of illegal trading.",
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
    };
    
    return [king];
  }

  static createScene1Objects() {
    const charlesDialogues = [
      "Your Majesty, I humbly propose a voyage unlike any before. By sailing west, we can reach the rich Spice Islands faster, and under the flag of Spain.",
      "But Magellan, you are Portuguese. Why should Spain trust you with such an endeavor?",
      "I have sworn loyalty to Your Majesty. I offer my knowledge, my maps, and my life in service to Spain.",
      "Very well. I grant you my support. You shall command five ships under the Spanish crown. May God guide you on your voyage."
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
    };
    
    return [charles];
  }

  static createScene2Objects() {
    const sailorDialogues = [
      "Captain, we've sailed so far south. Are we certain this 'Rio de la Plata' is truly a strait?",
      "It's been nothing but a wide estuary so far. The men are growing restless.",
      "Stay the course. We must continue south. If this is not the passage, then the true strait lies further along the coast.",
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
    };

    const sailor2 = new InteractiveObject(
      4, 15,
      "Tayog",
      ["Puro na lang debug, wala man lang hug.", "Panay quiz, wala man lang kiss."],
      ObjectType.SAILOR2,
      ["Tayog", "Tayog"]
    );
    
    return [sailor, sailor2];
  }

  static createScene3Objects() {
    const mutineerDialogues = [
      "Captain Magellan, we've had enough! This endless search for a passage that doesn't exist... We're turning back to Spain with or without you!",
      "You dare challenge my authority?! This mutiny ends now! I will not allow you to jeopardize this historic expedition!",
      "Your command is over, Magellan! The men are with us! We'll take the ships and return to civilization!",
      "Enough! I will execute the ringleaders and maroon the rest if I must. This voyage continues to the Spice Islands!"
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
    };

    const crew = new InteractiveObject(
      20, 22,
      "Crew Member",
      ["Captain, we're now on Port St. Julian and it seems the weather is unfortunately in a bad condition right now.", "What shall we do? Shall we continue ahead?"],
      ObjectType.SAILOR1,
      ["Crew Member", "Crew Member"]
    );
    
    return [mutineer, crew];
  }

  static createScene4Objects() {
    const sailor1 = new InteractiveObject(
      15, 15,
      "Crew Member",
      ["Captain, the provisions are nearly gone. We're eating leather and sawdust, softened in the sea.", "The men... they're losing hope. How much longer can this go on?", "Hold fast, my friend. We have crossed the greatest ocean. Land must be near. We are closer than you think."],
      ObjectType.SAILOR1,
      ["Crew Member", "Crew Member", "Magellan"]
    );
    
    const sailor2 = new InteractiveObject(
      20, 18,
      "Sailor",
      ["Is there truly land ahead? Or is this another mirage?"],
      ObjectType.SAILOR2
    );
    
    sailor2.onComplete = () => {
      MissionManager.setTalkedToAllSailors(true);
    };
    
    return [sailor1, sailor2];
  }

  static createScene5Objects() {
    const humabonDialogues = [
      "Greetings! My name is Magellan, we are travellers from the north-west land.",
      "Rajah Humabon, we come in peace, from a land far to the west. We seek friendship and trade. We wish to establish an alliance.",
      "What are your intentions for coming here?",
      "We're not here to cause trouble. Truthfully, we're here to introduce our culture and to be friends.",
      "That's good then! Welcome to our land, Magellan."
    ];
    
    const speakers = ["Magellan", "Magellan", "Rajah Humabon", "Magellan", "Rajah Humabon"];
    
    const humabon = new InteractiveObject(
      7, 9,
      "Rajah Humabon",
      humabonDialogues,
      ObjectType.HUMABON,
      speakers
    );
    
    humabon.onComplete = () => {
      MissionManager.setTalkedToHumabon(true);
    };

    const sailor1 = new InteractiveObject(
      42, 8,
      "Crew Member",
      ["Captain, the crew is settling in well on this island.", "The locals seem friendly and the provisions are plentiful."],
      ObjectType.SAILOR1,
      ["Crew Member", "Crew Member"]
    );
    
    return [humabon, sailor1];
  }
}