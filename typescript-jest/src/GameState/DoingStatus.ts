import { IGameStatus } from "./IGameStatus";

export class DoingStatus implements IGameStatus {
  constructor(private player1Point: number, private player2Point: number) {}
  
  getScore(): string {
    const player1Score = this.convertPointToScore(this.player1Point);
    const player2Score = this.convertPointToScore(this.player2Point);

    return `${player1Score}-${player2Score}`;
  }

  private convertPointToScore(score: number): string {
    switch (score) {
      case 0:
        return "Love";
      case 1:
        return "Fifteen";
      case 2:
        return "Thirty";
      case 3:
        return "Forty";
      default:
        return "";
    }
  }
}
