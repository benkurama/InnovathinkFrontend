import {create} from 'zustand';

const userStore = create((set, get) => ({
    userDetails: {},
    addToUser: (items) => set((state) => ({ userDetails: {...state.userDetails, items}})),
    getUser: () => {
        return get().userDetails;
    }
}));

export default userStore;