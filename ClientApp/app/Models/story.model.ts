interface IStory {
  by: string;
  title: string;
  url: string;
}

export class Story implements IStory {
  by: string;
  descendants: string;
  id: number;
  score: number;
  time: string;
  title: string;
  type: string;
  url: string;
}
