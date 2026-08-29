export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'ATT';
export type PlayerForm = 'hot' | 'normal' | 'cold';

export type PlayerAttributes = {
  pace: number;
  passing: number;
  fin: number;
  dribbling: number;
  defense: number;
};

export type GoalkeeperAttributes = {
  reflexes: number;
  handling: number;
  diving: number;
  positioning: number;
  kicking: number;
};

type BasePlayer = {
  id: string;
  name: string;
  team: string;
  price: number;
  rating: number;
  image: string;
  form: PlayerForm;
};

export type OutfieldPlayer = BasePlayer & {
  position: 'DEF' | 'MID' | 'ATT';
  attributes: PlayerAttributes;
};

export type GoalkeeperPlayer = BasePlayer & {
  position: 'GK';
  attributes: GoalkeeperAttributes;
};

export type Player = OutfieldPlayer | GoalkeeperPlayer;
