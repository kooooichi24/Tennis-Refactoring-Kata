import { IGameStatus } from "./IGameStatus";

export class DoneStatus implements IGameStatus {
  constructor(private player1Point: number, private player2Point: number) {}

  getScore(): string {
    return this.player1Point - this.player2Point >= 2
      ? "Win for player1"
      : "Win for player2";
  }
}
