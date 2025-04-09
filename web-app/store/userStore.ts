import { User, UserState } from '@/types/type';
import { create } from 'zustand';


export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
  setToken: (token: string) => {
    localStorage.setItem('token', token);
    set({ token });
  },

}));
