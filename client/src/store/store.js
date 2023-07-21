import create from 'zustand';

// Use As a Hooks for State Managment System
// Create central store in the react so from this central store you can access variable from any react component
// set : it set new value
export const useAuthStore = create((set) => ({
    auth : {
        username : "",
        active : false
    },
    setUsername : (name) => set((state) => ({auth : { ...state.auth, username : name}}))
}))