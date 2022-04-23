import { IGameStatus } from "./IGameStatus";

export class TieStatus implements IGameStatus {
  constructor(private player1Point: number) {}

  getScore(): string {
    switch (this.player1Point) {
      case 0:
        return "Love-All";
      case 1:
        return "Fifteen-All";
      case 2:
        return "Thirty-All";
      default:
        return "Deuce";
    }
  }
}
