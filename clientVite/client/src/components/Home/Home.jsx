import { useEffect, useState } from 'react'
import CardsNews from './Cards/CardsNews'
import './Home.css'
import SideBar from './SideBar/SideBar'
import TopBarHome from './TopBarHome/TopBarHome'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllVideoGames, getGenres, orderRecentGames, setFilterGames } from '../../redux/reducers/videogameSlice'
import { useLocation } from 'react-router'
import CardsAll from './Cards/CardsAll'
import Pagination from './Pagination/Pagination'
import ModalCreateVideoGame from '../Modals/ModalCreateVideoGame'
const URL_GET_ALL = 'http://localhost:3009/videogames'
const URL_GENDER = 'http://localhost:3009/genres'


const Home = () => {

    const location = useLocation().pathname

    const dispatch = useDispatch()
    const [modalCreate, setModalCreate] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fectchGender = async () => {
            const gendersFetch = (await axios(URL_GENDER)).data
            if (gendersFetch.status) {
                dispatch(getGenres(gendersFetch.genres))
            }
        }
        fectchGender()
        const getAllVideoGamesBackend = async () => {
            try {
                const allGames = (await axios(URL_GET_ALL)).data
                if (allGames.data) {

                    const orderVideoGames = allGames.data.sort((a, b) => {
                        const fechaA = new Date(a.lanzamiento)
                        const fechaB = new Date(b.lanzamiento)
                        return fechaB - fechaA;
                    })

                    const changeGenreGames = orderVideoGames?.map((videoGame) => {
                        const videoGameArray = videoGame.genres.split(',')
                        const randomIndex = Math.floor(Math.random() * videoGameArray.length)
                        const newGenre = videoGameArray[randomIndex]
                        return {
                            descripción: videoGame.descripción,
                            genres: newGenre,
                            id: videoGame.id,
                            imagen: videoGame.imagen,
                            nombre: videoGame.nombre,
                            plataformas: videoGame.plataformas,
                            rating: videoGame.rating
                        }
                    })


                    dispatch(orderRecentGames(changeGenreGames))
                    dispatch(getAllVideoGames(allGames.data))
                    dispatch(setFilterGames())
                    setLoading(false)
                }

            } catch (error) {
                alert(error.message)
            }
        }

        getAllVideoGamesBackend()
    }, [])
    return (
        <>
            { loading ? <div className='chargeLoading'>
                <div className="loaderCharge"></div>
            </div> :
                <>
                    <div className='modalOverAll'>
                        <ModalCreateVideoGame
                            modal={modalCreate}
                            closeModal={() => setModalCreate(false)}
                        />
                    </div>

                    <div className="backgroundHome">
                        <div className='sideBarOverAll'>
                            <SideBar />
                        </div>
                        <div className='selectOverAll'>
                            <TopBarHome
                                openModalCreate={() => setModalCreate(true)}
                            />
                        </div>
                        <div className='cards'>
                            {location === '/home' &&
                                <CardsNews />
                            }
                            {
                                (location === '/home/allGames' || location === '/home/apiGames' || location === '/home/myGames') &&
                                <CardsAll />
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Home