export class InteractiveObject {
  constructor(x, y, name, dialogues, type, alternatingSpeakers = null) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.dialogues = Array.isArray(dialogues) ? dialogues : [dialogues];
    this.type = type;
    this.alternatingSpeakers = alternatingSpeakers;
    this.currentDialogueIndex = 0;
    this.onComplete = null;
  }

  getCurrentSpeaker() {
    if (this.alternatingSpeakers && this.currentDialogueIndex < this.alternatingSpeakers.length) {
      return this.alternatingSpeakers[this.currentDialogueIndex];
    }
    return this.name;
  }

  getCurrentDialogue() {
    return this.dialogues[this.currentDialogueIndex];
  }

  advance() {
    if (this.currentDialogueIndex < this.dialogues.length - 1) {
      this.currentDialogueIndex++;
      return false; // Not finished
    } else {
      if (this.onComplete) this.onComplete();
      return true; // Finished
    }
  }

  reset() {
    this.currentDialogueIndex = 0;
  }

  isPlayerFacing(playerX, playerY, direction) {
    for (let ox = 0; ox < this.type.width; ox++) {
      for (let oy = 0; oy < this.type.height; oy++) {
        const objX = this.x + ox;
        const objY = this.y + oy;
        const dx = objX - playerX;
        const dy = objY - playerY;
        
        if (Math.abs(dx) + Math.abs(dy) !== 1) continue;
        
        if (direction === 'UP' && dy === -1) return true;
        if (direction === 'DOWN' && dy === 1) return true;
        if (direction === 'LEFT' && dx === -1) return true;
        if (direction === 'RIGHT' && dx === 1) return true;
      }
    }
    return false;
  }
}