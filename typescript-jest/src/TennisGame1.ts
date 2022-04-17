import { Player } from "./Player";
import { TennisGame } from "./TennisGame";

type Status = "DOING" | "TIE" | "ADVANTAGE" | "DONE";

export class TennisGame1 implements TennisGame {
  private player1Point: number = 0;
  private player2Point: number = 0;
  private player1: Player;
  private player2: Player;
  private status: Status;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.status = "TIE";
  }

  wonPoint(playerName: string): void {
    if (this.player1.name === playerName) {
      this.player1Point += 1;
    } else {
      this.player2Point += 1;
    }

    this.judge();
  }

  private judge(): void {
    if (this.player1Point === this.player2Point) {
      this.changeStatus("TIE");
    } else if (this.player1Point >= 4 || this.player2Point >= 4) {
      const absDiff = this.absDiff();

      if (absDiff === 1) {
        this.changeStatus("ADVANTAGE");
      } else {
        this.changeStatus("DONE");
      }
    } else {
      this.changeStatus("DOING");
    }
  }

  private absDiff() {
    return Math.abs(this.player1Point - this.player2Point);
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

    // this.status === "DONE"
    return this.getDoneScore();
  }

  private getDoingScore(): string {
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

  private getTieScore(): string {
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

  private getAdvantageScore(): string {
    const minusResult: number = this.player1Point - this.player2Point;

    if (minusResult === 1) {
      return "Advantage player1";
    } else {
      return "Advantage player2";
    }
  }

  private getDoneScore(): string {
    const minusResult: number = this.player1Point - this.player2Point;

    if (minusResult >= 2) {
      return "Win for player1";
    } else {
      return "Win for player2";
    }
  }
}
