import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allVideoGames: [],
    recentVideoGames: [],
    filteredVideoGames: [],
    referencias: {},
    allGenres: [],
    screenPosition: '',
}

export const videogameSlice = createSlice({
    name: 'videogames',
    initialState: initialState,
    reducers: {
        getAllVideoGames: (state, action) => {
            state.allVideoGames = action.payload
        },
        setReferences: (state, action) => {
            state.referencias = action.payload
        },
        setScreen: (state, action) => {
            state.screenPosition = action.payload
        },
        orderRecentGames: (state, action) => {
            state.recentVideoGames = action.payload
        },
        setFilterGames: (state, action) => {
            state.filteredVideoGames = [...state.allVideoGames]
        },

        getGenres: (state, action) => {
            state.allGenres = action.payload
        },
        orderGames: (state, action) => {

            const order = action.payload

        },

        updateFilters: (state, action) => {

            const filters = action.payload
            console.log(filters);
            const filterGameByGender = () => {

                if (filters.gender === '' || filters.gender === 'all') return [...state.allVideoGames]
                
                return [...state.allVideoGames].filter((videoGame) => {
                    const videoGameFilter = videoGame.genres.split(', ')
                    const filter = videoGameFilter.includes(filters.gender)
                    return filter
                })
            }
            
            
            const orderFunctions = {
                Ascendent: (values) => values.sort((a, b) =>
                    a.nombre.localeCompare(b.nombre)
                ),
                Descendent: (values) => values.sort((a, b) =>
                    b.nombre.localeCompare(a.nombre)
                ),
                higherRatings: (values) => values.sort((a, b) =>
                    b.rating - a.rating
                ),
                lowerRatings: (values) => values.sort((a, b) =>
                    a.rating - b.rating
                ),
                '': (values) => values
            }
            
            const applyFilters = (filters) => {
                return orderFunctions[filters.order](filterGameByGender())
            }

            state.filteredVideoGames = applyFilters(filters)
        },

        orderForAllCards: (state, action) => {
            const orderedGamesAsc = state.allVideoGames.sort((a, b) =>
                a.nombre.localeCompare(b.nombre))
            state.allVideoGames = orderedGamesAsc
        },
        orderForNewCards: (state, action) => {
            const orderByDate = [...state.allVideoGames].sort((a, b) => {
                const fechaA = new Date(a.lanzamiento)
                const fechaB = new Date(b.lanzamiento)
                return fechaB - fechaA;
            })

            state.allVideoGames = orderByDate
        }
    }
})

export const { getAllVideoGames, setReferences, setScreen, orderRecentGames, setFilterGames, filterByGender, getGenres, orderGames, orderForAllCards, updateFilters } = videogameSlice.actions;

export default videogameSlice.reducer


