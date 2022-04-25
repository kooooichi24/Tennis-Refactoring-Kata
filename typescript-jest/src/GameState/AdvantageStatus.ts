import { IGameStatus } from "./IGameStatus";

export class AdvantageStatus implements IGameStatus {
  constructor(private player1Point: number, private player2Point: number) {}

  getScore(): string {
    return this.player1Point - this.player2Point === 1
      ? "Advantage player1"
      : "Advantage player2";
  }
}
