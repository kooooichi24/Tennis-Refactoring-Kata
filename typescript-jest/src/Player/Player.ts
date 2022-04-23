export class Player {
  public point: number;
  
  constructor(readonly name: string) {
    this.point = 0;
  }

  wonPoint(): void {
    this.point += 1;
  }
}
