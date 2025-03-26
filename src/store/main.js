import { create } from 'zustand'

const useStore = create((set) => ({
    loggedUser: null,
    posts: [],
    error: null,
    singleUser: [],
    favoritePosts: [],
    updateLoggedUser: (loggedUser) => set({ loggedUser }),
    updateSingleUser: (singleUser) => set({ singleUser }),
    updateFavoritePosts: (favoritePosts) => set({ favoritePosts }),
    updatePosts: (posts) => set({ posts }),
    updateError: (error) => set({ error }),
}))

export default useStore;