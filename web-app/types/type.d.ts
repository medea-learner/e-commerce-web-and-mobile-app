
export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string) => void;
}

export type User = {
  id: number;
  email: string;
  username: string;
  password?: string;
  name?: {
    firstname: string;
    lastname: string;
  };
  token?: string;
};

export type Product = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export interface SearchFilterProps {
  search: string;
  filter: string;
  setSearch: (value: string) => void;
  setFilter: (value: string) => void;
  categories: string[];
}

