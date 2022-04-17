export class Player {
  public readonly name: string;
  public point: number;
  
  constructor(name: string) {
    this.name = name;
    this.point = 0;
  }

  wonPoint(): void {
    this.point += 1;
  }
}
