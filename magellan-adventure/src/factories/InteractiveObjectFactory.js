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

    // Guards directly flanking the throne
    const guard1 = new InteractiveObject(
      middleStart - 1, 3,
      "Royal Guard",
      ["The King is in a foul mood today.", "Best not to test his patience."],
      ObjectType.KAWAL,
      ["Royal Guard", "Royal Guard"]
    );

    const guard2 = new InteractiveObject(
      middleStart + 5, 3,
      "Royal Guard",
      ["Stand back, sailor.", "The King will see you when he's ready."],
      ObjectType.KAWAL,
      ["Royal Guard", "Royal Guard"]
    );

    // Palace entrance guards
    const entranceGuard1 = new InteractiveObject(
      middleStart - 2, 25,
      "Palace Guard",
      ["State your business in the royal court.", "The King sees many petitioners today."],
      ObjectType.KAWAL,
      ["Palace Guard", "Palace Guard"]
    );

    const entranceGuard2 = new InteractiveObject(
      middleStart + 6, 25,
      "Palace Guard",
      ["Show respect in the presence of His Majesty.", "Many have been turned away today."],
      ObjectType.KAWAL,
      ["Palace Guard", "Palace Guard"]
    );

    // Royal advisors
    const advisor1 = new InteractiveObject(
      middleStart - 4, 8,
      "Royal Advisor",
      ["The King's patience wears thin with failed proposals.", "Perhaps it's time to seek fortune elsewhere, Magellan."],
      ObjectType.CHARLES,
      ["Royal Advisor", "Royal Advisor"]
    );

    const advisor2 = new InteractiveObject(
      middleStart + 8, 8,
      "Court Nobleman",
      ["I've heard whispers of your trading ventures.", "The court is not fond of Portuguese sailors these days."],
      ObjectType.CHARLES,
      ["Court Nobleman", "Court Nobleman"]
    );

    // Court servants
    const servant1 = new InteractiveObject(
      2, 15,
      "Court Servant",
      ["The throne room has seen many rejected proposals this year.", "But perhaps yours will be different... perhaps not."],
      ObjectType.SAILOR1,
      ["Court Servant", "Court Servant"]
    );

    const servant2 = new InteractiveObject(
      sceneCols - 4, 15,
      "Court Servant",
      ["I serve the King faithfully.", "Whatever his decision, it is law."],
      ObjectType.SAILOR2,
      ["Court Servant", "Court Servant"]
    );
    
    return [king, guard1, guard2, entranceGuard1, entranceGuard2, advisor1, advisor2, servant1, servant2];
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

    // Add Spanish guards
    const guard1 = new InteractiveObject(
      42, 44,
      "Spanish Guard",
      ["Welcome to Spain, Captain.", "The King awaits your proposal."],
      ObjectType.KAWAL,
      ["Spanish Guard", "Spanish Guard"]
    );

    const guard2 = new InteractiveObject(
      48, 44,
      "Spanish Guard",
      ["King Charles is generous to those who serve Spain well.", "May fortune favor your voyage."],
      ObjectType.KAWAL,
      ["Spanish Guard", "Spanish Guard"]
    );
    
    return [charles, guard1, guard2];
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

    // First mate
    const firstMate = new InteractiveObject(
      30, 20,
      "First Mate",
      ["Captain, the San Antonio is falling behind.", "Should we signal them to keep pace?"],
      ObjectType.SAILOR1,
      ["First Mate", "First Mate"]
    );

    // Navigator
    const navigator = new InteractiveObject(
      35, 20,
      "Navigator",
      ["The stars guide us, Captain.", "But these waters are uncharted.", "We must rely on dead reckoning and faith."],
      ObjectType.SAILOR1,
      ["Navigator", "Navigator", "Navigator"]
    );

    // Pilot checking instruments
    const pilot = new InteractiveObject(
      25, 18,
      "Ship's Pilot",
      ["The compass shows we're heading southwest.", "The currents here are strong and unpredictable."],
      ObjectType.SAILOR2,
      ["Ship's Pilot", "Ship's Pilot"]
    );

    // Worried sailors
    const worriedSailor1 = new InteractiveObject(
      15, 20,
      "Worried Sailor",
      ["We've been at sea for months now.", "Some of the men are talking about turning back."],
      ObjectType.SAILOR2,
      ["Worried Sailor", "Worried Sailor"]
    );

    const worriedSailor2 = new InteractiveObject(
      40, 18,
      "Anxious Sailor",
      ["What if there is no passage to the Pacific?", "We could be sailing to our doom!"],
      ObjectType.SAILOR1,
      ["Anxious Sailor", "Anxious Sailor"]
    );

    // Ship's carpenter
    const carpenter = new InteractiveObject(
      20, 15,
      "Ship's Carpenter",
      ["The Trinidad needs repairs, Captain.", "The constant battering from the waves is taking its toll."],
      ObjectType.SAILOR2,
      ["Ship's Carpenter", "Ship's Carpenter"]
    );

    // Cook
    const cook = new InteractiveObject(
      10, 18,
      "Ship's Cook",
      ["Our provisions are holding steady, Captain.", "But the men grow tired of salted meat and hardtack."],
      ObjectType.SAILOR1,
      ["Ship's Cook", "Ship's Cook"]
    );

    // Lookout
    const lookout = new InteractiveObject(
      45, 15,
      "Lookout",
      ["I scan the horizon daily for signs of land.", "So far, nothing but endless coastline."],
      ObjectType.SAILOR2,
      ["Lookout", "Lookout"]
    );

    // Portuguese officer (potential troublemaker)
    const portugueseOfficer = new InteractiveObject(
      32, 25,
      "Portuguese Officer",
      ["The Portuguese captains are unhappy, Magellan.", "They question why we follow a traitor to Portugal."],
      ObjectType.SAILOR1,
      ["Portuguese Officer", "Portuguese Officer"]
    );

    // Easter egg character
    const tayog = new InteractiveObject(
      4, 15,
      "Tayog",
      ["Puro na lang debug, wala man lang hug.", "Panay quiz, wala man lang kiss.", "Pero okay lang, mahal ko pa rin ang coding!"],
      ObjectType.SAILOR2,
      ["Tayog", "Tayog", "Tayog"]
    );

    // Deck hand
    const deckHand = new InteractiveObject(
      50, 20,
      "Deck Hand",
      ["The sails are holding up well, Captain.", "Though we could use calmer seas!"],
      ObjectType.SAILOR1,
      ["Deck Hand", "Deck Hand"]
    );
    
    return [sailor, firstMate, navigator, pilot, worriedSailor1, worriedSailor2, 
            carpenter, cook, lookout, portugueseOfficer, tayog, deckHand];
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

    // Crew reporting the situation
    const reportingCrew = new InteractiveObject(
      20, 22,
      "Crew Member",
      ["Captain, we're now on Port St. Julian and it seems the weather is unfortunately in a bad condition right now.", "What shall we do? Shall we continue ahead?"],
      ObjectType.SAILOR1,
      ["Crew Member", "Crew Member"]
    );

    // Loyal guards protecting Magellan
    const loyalGuard1 = new InteractiveObject(
      26, 22,
      "Loyal Guard",
      ["I stand with you, Captain.", "These mutineers will be dealt with."],
      ObjectType.KAWAL,
      ["Loyal Guard", "Loyal Guard"]
    );

    const loyalGuard2 = new InteractiveObject(
      22, 20,
      "Loyal Guard",
      ["Your orders, Captain?", "We're ready to defend your command!"],
      ObjectType.KAWAL,
      ["Loyal Guard", "Loyal Guard"]
    );

    // Additional mutineers
    const mutineer2 = new InteractiveObject(
      26, 26,
      "Angry Mutineer",
      ["We're freezing in this God-forsaken place!", "We demand to return to Spain immediately!"],
      ObjectType.SAILOR2,
      ["Angry Mutineer", "Angry Mutineer"]
    );

    const mutineer3 = new InteractiveObject(
      22, 26,
      "Rebellious Sailor",
      ["The Portuguese captains speak the truth!", "This voyage is folly!"],
      ObjectType.SAILOR1,
      ["Rebellious Sailor", "Rebellious Sailor"]
    );

    // Neutral/frightened crew
    const scaredSailor1 = new InteractiveObject(
      18, 25,
      "Frightened Sailor",
      ["I don't want any part of this mutiny...", "But I'm too afraid to speak up."],
      ObjectType.SAILOR2,
      ["Frightened Sailor", "Frightened Sailor"]
    );

    const scaredSailor2 = new InteractiveObject(
      28, 20,
      "Conflicted Sailor",
      ["I respect Captain Magellan, but...", "This winter has been brutal. Many men are suffering."],
      ObjectType.SAILOR1,
      ["Conflicted Sailor", "Conflicted Sailor"]
    );

    // The captain who lost a ship
    const grievingCaptain = new InteractiveObject(
      30, 25,
      "Grieving Captain",
      ["We lost the Santiago to the rocks...", "So many good men gone.", "And now this mutiny threatens everything!"],
      ObjectType.CHARLES,
      ["Grieving Captain", "Grieving Captain", "Grieving Captain"]
    );

    // Loyal officers
    const loyalOfficer1 = new InteractiveObject(
      20, 18,
      "Loyal Officer",
      ["Captain Magellan, I pledge my loyalty.", "We'll quell this rebellion together!"],
      ObjectType.CHARLES,
      ["Loyal Officer", "Loyal Officer"]
    );

    const loyalOfficer2 = new InteractiveObject(
      28, 18,
      "First Officer",
      ["The mutineers have seized the San Antonio!", "We must act quickly, Captain!"],
      ObjectType.CHARLES,
      ["First Officer", "First Officer"]
    );

    // Sick/injured crew
    const injuredSailor = new InteractiveObject(
      15, 22,
      "Injured Sailor",
      ["The scurvy is spreading, Captain...", "Many of us can barely stand.", "But I'll still follow your command."],
      ObjectType.SAILOR2,
      ["Injured Sailor", "Injured Sailor", "Injured Sailor"]
    );

    // Ship's surgeon
    const surgeon = new InteractiveObject(
      32, 22,
      "Ship's Surgeon",
      ["Captain, the winter has taken its toll.", "Scurvy, frostbite, and now this mutiny...", "We need fresh provisions desperately!"],
      ObjectType.SAILOR1,
      ["Ship's Surgeon", "Ship's Surgeon", "Ship's Surgeon"]
    );

    // Indigenous observer (watching from distance)
    const indigenous = new InteractiveObject(
      35, 30,
      "Local Observer",
      ["Strange men with big ships...", "They fight among themselves.", "What brings them to our shores?"],
      ObjectType.SAILOR2,
      ["Local Observer", "Local Observer", "Local Observer"]
    );
    
    return [mutineer, reportingCrew, loyalGuard1, loyalGuard2, mutineer2, mutineer3,
            scaredSailor1, scaredSailor2, grievingCaptain, loyalOfficer1, loyalOfficer2,
            injuredSailor, surgeon, indigenous];
  }

  static createScene4Objects() {
    const sailor1 = new InteractiveObject(
      15, 15,
      "Starving Crew Member",
      ["Captain, the provisions are nearly gone. We're eating leather and sawdust, softened in the sea.", "The men... they're losing hope. How much longer can this go on?", "Hold fast, my friend. We have crossed the greatest ocean. Land must be near. We are closer than you think."],
      ObjectType.SAILOR1,
      ["Starving Crew Member", "Starving Crew Member", "Magellan"]
    );
    
    const sailor2 = new InteractiveObject(
      20, 18,
      "Desperate Sailor",
      ["Is there truly land ahead? Or is this another mirage?", "I can barely remember what fresh food tastes like..."],
      ObjectType.SAILOR2,
      ["Desperate Sailor", "Desperate Sailor"]
    );
    
    sailor2.onComplete = () => {
      MissionManager.setTalkedToAllSailors(true);
    };

    // Sick and dying crew
    const sickCrew1 = new InteractiveObject(
      18, 20,
      "Sick Sailor",
      ["I can barely stand, Captain...", "The scurvy... my gums bleed, my teeth are loose...", "But I'll press on for the crew."],
      ObjectType.SAILOR1,
      ["Sick Sailor", "Sick Sailor", "Sick Sailor"]
    );

    const sickCrew2 = new InteractiveObject(
      22, 16,
      "Weak Sailor",
      ["We've been eating rats, Captain...", "Even the rats are running out now.", "What will we do?"],
      ObjectType.SAILOR2,
      ["Weak Sailor", "Weak Sailor", "Weak Sailor"]
    );

    // Ship's surgeon overwhelmed
    const surgeon = new InteractiveObject(
      25, 20,
      "Exhausted Surgeon",
      ["Captain, I've lost nineteen men to scurvy and starvation.", "My medicine chest is empty.", "I can do nothing but watch them suffer."],
      ObjectType.CHARLES,
      ["Exhausted Surgeon", "Exhausted Surgeon", "Exhausted Surgeon"]
    );

    // Hopeful lookout
    const lookout = new InteractiveObject(
      30, 15,
      "Hopeful Lookout",
      ["Captain! I thought I saw birds yesterday!", "Birds mean land is near, don't they?", "Please let it be true..."],
      ObjectType.SAILOR1,
      ["Hopeful Lookout", "Hopeful Lookout", "Hopeful Lookout"]
    );

    // Dying sailor
    const dyingSailor = new InteractiveObject(
      12, 18,
      "Dying Sailor",
      ["Tell... tell my family in Seville...", "That I died... seeking glory...", "For Spain..."],
      ObjectType.SAILOR2,
      ["Dying Sailor", "Dying Sailor", "Dying Sailor"]
    );

    // First mate trying to keep morale
    const firstMate = new InteractiveObject(
      25, 14,
      "First Mate",
      ["Stay strong, men!", "The Captain says land is near!", "We haven't come this far to give up now!"],
      ObjectType.CHARLES,
      ["First Mate", "First Mate", "First Mate"]
    );

    // Navigator still working
    const navigator = new InteractiveObject(
      28, 20,
      "Navigator",
      ["By my calculations, we should reach Guam soon.", "If my charts are correct...", "They must be correct. They have to be."],
      ObjectType.SAILOR1,
      ["Navigator", "Navigator", "Navigator"]
    );

    // Cook with empty pots
    const cook = new InteractiveObject(
      10, 20,
      "Ship's Cook",
      ["I'm boiling leather straps to make soup.", "I never thought it would come to this.", "The men deserve better."],
      ObjectType.SAILOR2,
      ["Ship's Cook", "Ship's Cook", "Ship's Cook"]
    );

    // Priest giving last rites
    const priest = new InteractiveObject(
      16, 22,
      "Ship's Priest",
      ["I've given last rites to twelve men this week.", "Lord, grant us the strength to endure...", "And deliver us to salvation."],
      ObjectType.CHARLES,
      ["Ship's Priest", "Ship's Priest", "Ship's Priest"]
    );

    // Young cabin boy
    const cabinBoy = new InteractiveObject(
      22, 22,
      "Cabin Boy",
      ["I'm so hungry, sir...", "Mother said I'd see the world...", "I just want to go home."],
      ObjectType.SAILOR2,
      ["Cabin Boy", "Cabin Boy", "Cabin Boy"]
    );

    // Veteran sailor
    const veteranSailor = new InteractiveObject(
      26, 18,
      "Veteran Sailor",
      ["I've been to sea for thirty years...", "Never seen suffering like this.", "But if anyone can get us through, it's Magellan."],
      ObjectType.SAILOR1,
      ["Veteran Sailor", "Veteran Sailor", "Veteran Sailor"]
    );

    // Water collector
    const waterCollector = new InteractiveObject(
      18, 12,
      "Water Keeper",
      ["The water barrels are nearly dry, Captain.", "We're rationing to a cup per man per day.", "It's not enough..."],
      ObjectType.SAILOR2,
      ["Water Keeper", "Water Keeper", "Water Keeper"]
    );
    
    return [sailor1, sailor2, sickCrew1, sickCrew2, surgeon, lookout, dyingSailor,
            firstMate, navigator, cook, priest, cabinBoy, veteranSailor, waterCollector];
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

    // Recovering crew member
    const sailor1 = new InteractiveObject(
      42, 8,
      "Recovering Crew Member",
      ["Captain, the crew is settling in well on this island.", "The locals seem friendly and the provisions are plentiful.", "It's like paradise after months at sea!"],
      ObjectType.SAILOR1,
      ["Recovering Crew Member", "Recovering Crew Member", "Recovering Crew Member"]
    );

    // Filipino warriors/guards
    const filipinoGuard1 = new InteractiveObject(
      5, 9,
      "Filipino Warrior",
      ["Welcome to Cebu, stranger.", "The Rajah is a wise and just leader.", "Treat our people with respect."],
      ObjectType.KAWAL,
      ["Filipino Warrior", "Filipino Warrior", "Filipino Warrior"]
    );

    const filipinoGuard2 = new InteractiveObject(
      9, 9,
      "Filipino Warrior",
      ["Our people value friendship and honor.", "You have come a long way.", "The Rajah will decide if you are friend or foe."],
      ObjectType.KAWAL,
      ["Filipino Warrior", "Filipino Warrior", "Filipino Warrior"]
    );

    const filipinoGuard3 = new InteractiveObject(
      7, 6,
      "Royal Guard",
      ["I protect the Rajah with my life.", "State your business clearly."],
      ObjectType.KAWAL,
      ["Royal Guard", "Royal Guard"]
    );

    const filipinoGuard4 = new InteractiveObject(
      7, 12,
      "Royal Guard",
      ["The Rajah is generous to peaceful visitors.", "But swift justice comes to those who cause trouble."],
      ObjectType.KAWAL,
      ["Royal Guard", "Royal Guard"]
    );

    // Filipino nobles and advisors
    const noble1 = new InteractiveObject(
      10, 12,
      "Filipino Noble",
      ["These foreigners bring strange goods.", "Perhaps trade with them will benefit Cebu."],
      ObjectType.CHARLES,
      ["Filipino Noble", "Filipino Noble"]
    );

    const noble2 = new InteractiveObject(
      4, 12,
      "Court Advisor",
      ["The Rajah must be cautious.", "We know nothing of these pale strangers and their intentions."],
      ObjectType.CHARLES,
      ["Court Advisor", "Court Advisor"]
    );

    // Local villagers
    const villager1 = new InteractiveObject(
      15, 10,
      "Curious Villager",
      ["I've never seen ships so large!", "Where do you come from, stranger?"],
      ObjectType.SAILOR2,
      ["Curious Villager", "Curious Villager"]
    );

    const villager2 = new InteractiveObject(
      20, 8,
      "Local Trader",
      ["You seek spices? We have the finest in these islands!", "Perhaps we can do business."],
      ObjectType.SAILOR1,
      ["Local Trader", "Local Trader"]
    );

    const villager3 = new InteractiveObject(
      12, 15,
      "Village Elder",
      ["I remember when the Chinese traders first came.", "Now these men from even farther away...", "The world grows smaller each year."],
      ObjectType.CHARLES,
      ["Village Elder", "Village Elder", "Village Elder"]
    );

    // Spanish crew members exploring
    const sailor2 = new InteractiveObject(
      38, 12,
      "Amazed Sailor",
      ["Captain! The food here is incredible!", "Fresh fruit, fish, rice... I'd forgotten what real food tastes like!"],
      ObjectType.SAILOR2,
      ["Amazed Sailor", "Amazed Sailor"]
    );

    const sailor3 = new InteractiveObject(
      45, 10,
      "Grateful Sailor",
      ["The locals gave me coconuts and bananas!", "My scurvy is already improving!", "Praise God for this paradise!"],
      ObjectType.SAILOR1,
      ["Grateful Sailor", "Grateful Sailor", "Grateful Sailor"]
    );

    const sailor4 = new InteractiveObject(
      40, 15,
      "Trading Sailor",
      ["Look at these spices, Captain!", "Cloves, nutmeg, cinnamon!", "We've found what we came for!"],
      ObjectType.SAILOR2,
      ["Trading Sailor", "Trading Sailor", "Trading Sailor"]
    );

    // Interpreter/translator
    const interpreter = new InteractiveObject(
      12, 9,
      "Enrique the Interpreter",
      ["Captain, I can speak their language!", "My homeland is near these islands.", "I will translate for you."],
      ObjectType.SAILOR1,
      ["Enrique the Interpreter", "Enrique the Interpreter", "Enrique the Interpreter"]
    );

    // Filipino women offering hospitality
    const villager4 = new InteractiveObject(
      25, 12,
      "Kind Villager",
      ["Please, rest and eat.", "You look tired from your journey.", "Our village welcomes peaceful traders."],
      ObjectType.SAILOR2,
      ["Kind Villager", "Kind Villager", "Kind Villager"]
    );

    // Local priest/babaylan
    const babaylan = new InteractiveObject(
      18, 15,
      "Babaylan",
      ["The spirits told me strangers would come from across the great waters.", "Your arrival was prophesied.", "What will you bring - blessing or curse?"],
      ObjectType.CHARLES,
      ["Babaylan", "Babaylan", "Babaylan"]
    );

    // Spanish priest
    const spanishPriest = new InteractiveObject(
      35, 8,
      "Father Pedro",
      ["Captain, we must spread the word of God here!", "These people's souls need salvation.", "This is God's will that brought us here."],
      ObjectType.CHARLES,
      ["Father Pedro", "Father Pedro", "Father Pedro"]
    );

    // First mate observing
    const firstMate = new InteractiveObject(
      48, 12,
      "First Mate",
      ["Captain, the men are overjoyed to be on land again.", "We've lost so many on this voyage...", "But we've made it. We've reached the Spice Islands!"],
      ObjectType.CHARLES,
      ["First Mate", "First Mate", "First Mate"]
    );
    
    return [humabon, sailor1, filipinoGuard1, filipinoGuard2, filipinoGuard3, filipinoGuard4,
            noble1, noble2, villager1, villager2, villager3, sailor2, sailor3, sailor4,
            interpreter, villager4, babaylan, spanishPriest, firstMate];
  }
}