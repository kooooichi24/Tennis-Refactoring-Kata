import { Player } from "./Player";
import { ITennisGame } from "./ITennisGame";

type Status = "DOING" | "TIE" | "ADVANTAGE" | "DONE";

export class TennisGame implements ITennisGame {
  private gameNumber: number;
  private player1: Player;
  private player2: Player;
  private status: Status;

  constructor(n: number, player1Name: string, player2Name: string) {
    this.gameNumber = n;
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.status = "TIE";
  }

  wonPoint(playerName: string): void {
    if (this.player1.name === playerName) {
      this.player1.wonPoint();
    } else {
      this.player2.wonPoint();
    }

    this.judge();
  }

  private judge(): void {
    if (this.player1.point === this.player2.point) {
      this.changeStatus("TIE");
    } else if (this.player1.point >= 4 || this.player2.point >= 4) {
      const absDiff = Math.abs(this.player1.point - this.player2.point);

      if (absDiff === 1) {
        this.changeStatus("ADVANTAGE");
      } else {
        this.changeStatus("DONE");
      }
    } else {
      this.changeStatus("DOING");
    }
  }

  private changeStatus(status: Status): void {
    this.status = status;
  }

  getScore(): string {
    if (this.status === "DOING") {
      return this.getDoingScore();
    }
    if (this.status === "TIE") {
      return this.getTieScore();
    }
    if (this.status === "ADVANTAGE") {
      return this.getAdvantageScore();
    }

    return this.getDoneScore();
  }

  private getDoingScore(): string {
    const player1Score = this.convertPointToScore(this.player1.point);
    const player2Score = this.convertPointToScore(this.player2.point);

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

  private getTieScore(): string {
    switch (this.player1.point) {
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

  private getAdvantageScore(): string {
    const minusResult: number = this.player1.point - this.player2.point;

    if (minusResult === 1) {
      return "Advantage player1";
    } else {
      return "Advantage player2";
    }
  }

  private getDoneScore(): string {
    const minusResult: number = this.player1.point - this.player2.point;

    if (minusResult >= 2) {
      return "Win for player1";
    } else {
      return "Win for player2";
    }
  }
}
