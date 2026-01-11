export const MissionManager = {
  hasTalkedToKingManuel: false,
  hasTalkedToKingCharles: false,
  hasTalkedToSailor: false,
  hasDealtWithMutineers: false,
  hasTalkedToAllSailors: false,
  hasTalkedToHumabon: false,

  setTalkedToKingManuel(value) { this.hasTalkedToKingManuel = value; },
  setTalkedToKingCharles(value) { this.hasTalkedToKingCharles = value; },
  setTalkedToSailor(value) { this.hasTalkedToSailor = value; },
  setDealtWithMutineers(value) { this.hasDealtWithMutineers = value; },
  setTalkedToAllSailors(value) { this.hasTalkedToAllSailors = value; },
  setTalkedToHumabon(value) { this.hasTalkedToHumabon = value; },

  reset() {
    this.hasTalkedToKingManuel = false;
    this.hasTalkedToKingCharles = false;
    this.hasTalkedToSailor = false;
    this.hasDealtWithMutineers = false;
    this.hasTalkedToAllSailors = false;
    this.hasTalkedToHumabon = false;
  }
};