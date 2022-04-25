import { Player } from "../Player/Player";
import { ITennisGame } from "./ITennisGame";
import { IGameStatus } from "../GameState/IGameStatus";
import { TieStatus } from "../GameState/TieStatus";
import { AdvantageStatus } from "../GameState/AdvantageStatus";
import { DoneStatus } from "../GameState/DoneStatus";
import { DoingStatus } from "../GameState/DoingStatus";

export class TennisGame implements ITennisGame {
  private player1: Player;
  private player2: Player;
  private status: IGameStatus;

  constructor(
    private nthGame: number,
    player1Name: string,
    player2Name: string
  ) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.status = new TieStatus(this.player1.point);
  }

  wonPoint(playerName: string): void {
    this.player1.name === playerName
      ? this.player1.wonPoint()
      : this.player2.wonPoint();

    this.judgeStatus();
  }

  getScore(): string {
    return this.status.getScore();
  }

  private judgeStatus(): void {
    const absDiff = Math.abs(this.player1.point - this.player2.point);

    if (absDiff === 0) {
      this.status = new TieStatus(this.player1.point);
    } else if (this.player1.point < 4 && this.player2.point < 4) {
      this.status = new DoingStatus(this.player1.point, this.player2.point);
    } else if (absDiff === 1) {
      this.status = new AdvantageStatus(this.player1.point, this.player2.point);
    } else {
      this.status = new DoneStatus(this.player1.point, this.player2.point);
    }
  }
}
