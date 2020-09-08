export type Country = {
  id: string;
  name: string;
};

export type Genre = {
  id: string;
  name: string;
};

export type Group = {
  id: number;
  name: string;
  type: string;
  dateFormed: string;
  majorGenre: {
    id: number;
    name: string;
  };
  minorGenre: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  persons: [Person];
};

export type Person = {
  id: number;
  name: string;
  type: string;
  dob: string;
  country: {
    id: number;
    name: string;
  };
  groups: [Group];
};
