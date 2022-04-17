import { Player } from "./Player";
import { TennisGame } from "./TennisGame";

type Status = "DOING" | "TIE" | "ADVANTAGE" | "DONE";

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1: Player;
  private player2: Player;
  private status: Status;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.status = "TIE";
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.player1Score += 1;
    else this.player2Score += 1;

    this.judge();
  }

  private judge(): void {
    if (this.player1Score === this.player2Score) {
      this.changeStatus("TIE");
    } else if (this.player1Score >= 4 || this.player2Score >= 4) {
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
    return Math.abs(this.player1Score - this.player2Score);
  }

  private changeStatus(status: Status): void {
    this.status = status;
  }

  getScore(): string {
    let score: string = "";
    let tempScore: number = 0;
    if (this.status === "DOING") {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.player1Score;
        else {
          score += "-";
          tempScore = this.player2Score;
        }
        switch (tempScore) {
          case 0:
            score += "Love";
            break;
          case 1:
            score += "Fifteen";
            break;
          case 2:
            score += "Thirty";
            break;
          case 3:
            score += "Forty";
            break;
        }
      }
    } else if (this.status === "TIE") {
      switch (this.player1Score) {
        case 0:
          score = "Love-All";
          break;
        case 1:
          score = "Fifteen-All";
          break;
        case 2:
          score = "Thirty-All";
          break;
        default:
          score = "Deuce";
          break;
      }
    } else if (this.status === "ADVANTAGE") {
      const minusResult: number = this.player1Score - this.player2Score;
      if (minusResult === 1) score = "Advantage player1";
      else if (minusResult === -1) score = "Advantage player2";
    } else if (this.status === "DONE") {
      const minusResult: number = this.player1Score - this.player2Score;
      if (minusResult >= 2) score = "Win for player1";
      else score = "Win for player2";
    }
    return score;
  }
}
