import * as fs from 'fs';
import * as path from 'path';
import { ITennisGame, TennisGame } from '../src';

function getAllScores(): Array<[number, number, string]> {
  const testCases = path.resolve(__dirname, 'scores.json');
  const scoreData = fs.readFileSync(testCases).toString();
  const scores = JSON.parse(scoreData);
  return JSON.parse(JSON.stringify(scores));
}

const scores: Array<[number, number, string]> = getAllScores();

function checkScore(game: ITennisGame, player1Score: number, player2Score: number, expectedScore: string): void {
  const highestScore: number = Math.max(player1Score, player2Score);
  for (let i = 0; i < highestScore; i++) {
    if (i < player1Score) {
      game.wonPoint('player1');
    }
    if (i < player2Score) {
      game.wonPoint('player2');
    }
  }
  expect(game.getScore()).toEqual(expectedScore);
}

describe('TennisGame', () => {

  describe('TennisGame1', () => {
    scores.forEach(([player1Score, player2Score, expectedScore]) => {
      it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, () => {
        checkScore(new TennisGame(1, 'player1', 'player2'), player1Score, player2Score, expectedScore);
      });
    });
  });

  describe('TennisGame2', () => {
    scores.forEach(([player1Score, player2Score, expectedScore]) => {
      it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, () => {
        checkScore(new TennisGame(2, 'player1', 'player2'), player1Score, player2Score, expectedScore);
      });
    });
  });

  describe('TennisGame3', () => {
    scores.forEach(([player1Score, player2Score, expectedScore]) => {
      it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, () => {
        checkScore(new TennisGame(3, 'player1', 'player2'), player1Score, player2Score, expectedScore);
      });
    });
  });

});
