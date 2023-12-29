import { configureStore } from '@reduxjs/toolkit'
import videogameReducer from './reducers/videogameSlice'
import usersReducer from './reducers/userSlice'
import infoReducer from './reducers/InfoSlice'

const store = configureStore({
    reducer: {
        videogames: videogameReducer,
        users: usersReducer,
        infoSearch: infoReducer
    }
})

export default store