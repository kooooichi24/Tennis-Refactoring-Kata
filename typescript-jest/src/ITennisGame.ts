export interface ITennisGame {
  wonPoint(playerName: string): void;
  getScore(): string;
}
