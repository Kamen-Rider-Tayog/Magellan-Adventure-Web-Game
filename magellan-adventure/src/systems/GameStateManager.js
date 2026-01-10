import MissionManager from '../game/MissionManager';
import SceneTile from '../game/SceneTile';
import InteractiveObjectFactory from '../game/InteractiveObjectFactory';
import SceneOne from '../scenes/SceneOne';
import SceneTwo from '../scenes/SceneTwo';
import SceneThree from '../scenes/SceneThree';
import SceneFour from '../scenes/SceneFour';
import SceneFive from '../scenes/SceneFive';
import SceneSix from '../scenes/SceneSix';

const SCENES = [
  { cols: 21, rows: 30 },
  { cols: 64, rows: 64 },
  { cols: 61, rows: 32 },
  { cols: 48, rows: 48 },
  { cols: 61, rows: 32 },
  { cols: 64, rows: 64 }
];

export const NARRATIVES = [
  ["Portugal and Spain, two formidable maritime powers, found themselves in a fierce contest.",
   "Both sought new lands and lucrative trade routes to the East.",
   "A young, determined FERDINAND MAGELLAN stands before the Portuguese monarch..."],
  ["Denied by his homeland, Magellan renounced his allegiance to Portugal",
   "and became a naturalized Spanish citizen."],
  ["Magellan's fleet set sail, crossing the Atlantic from Seville, Spain.",
   "They navigated south seeking the elusive passage to the Pacific."],
  ["During harsh winter months at Port Julian, tensions flared.",
   "A plot to overthrow Magellan's command began to unfold."],
  ["On October 21st, 1520, Magellan finally located the long-sought waterway:",
   "the Strait of Magellan."],
  ["On March 6th, 1521, they made landfall on Guam,",
   "then arrived in the Philippines on March 16th."],
  ["Magellan and Rajah Humabon performed the blood compact ritual.",
   "Thank you for experiencing Magellan's Journey!"]
];

export const setupScene = (sceneIndex, sceneRef, objectsRef) => {
  const scene = new SceneTile(SCENES[sceneIndex].cols, SCENES[sceneIndex].rows);
  
  switch (sceneIndex) {
    case 0: SceneOne.setup(scene); break;
    case 1: SceneTwo.setup(scene); break;
    case 2: SceneThree.setup(scene); break;
    case 3: SceneFour.setup(scene); break;
    case 4: SceneFive.setup(scene); break;
    case 5: SceneSix.setup(scene); break;
  }
  
  sceneRef.current = scene;
  objectsRef.current = InteractiveObjectFactory.createSceneObjects(sceneIndex, scene.cols);
  
  return {
    player: { 
      x: Math.floor(scene.cols / 2), 
      y: Math.floor(scene.rows / 2), 
      direction: 'DOWN', 
      frame: 1 
    },
    camera: { x: 0, y: 0 },
    showNarrative: true,
    narrativeIndex: 0
  };
};

export const getMissionText = (currentScene) => {
  switch (currentScene) {
    case 0: return SceneOne.getMissionText();
    case 1: return SceneTwo.getMissionText();
    case 2: return SceneThree.getMissionText();
    case 3: return SceneFour.getMissionText();
    case 4: return SceneFive.getMissionText();
    case 5: return SceneSix.getMissionText();
    default: return '';
  }
};

export const getSceneName = (currentScene) => {
  const names = ['Throne Room', 'Spanish Port', 'Ship Deck', 'Port Julian', 'Pacific', 'Philippines'];
  return names[currentScene] || '';
};