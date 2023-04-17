

interface Card {
  link: string;
  image: string;
  name: string;
  id: number;
  detail: {
    upright: string;
    reversed: string;
    keyword: string;
    meaning: string;
    symbolism: string;
  }
}