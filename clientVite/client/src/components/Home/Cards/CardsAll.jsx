import { useDispatch, useSelector } from 'react-redux'
import './Cards.css'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import { useEffect, useState } from 'react'
import { orderForAllCards, setFilterGames } from '../../../redux/reducers/videogameSlice'
import { changeCurrentPage } from '../../../redux/reducers/InfoSlice'
import { useLocation } from 'react-router'
import ModalCreateVideoGame from '../../Modals/ModalCreateVideoGame'


const CardsAll = () => {

    const location = useLocation().pathname
    const infoSearch = useSelector((state) => state.infoSearch.searchInfo)
    const [loading, setLoading] = useState(false)
    const allVideoGameFetch = useSelector((state) => state.videogames.filteredVideoGames)
    const allVideoGameF = () => {
        if (location === '/home/apiGames') {
            const apiGame = [...allVideoGameFetch].filter((videoGames) => String(videoGames.id).length < 10)
            console.log(apiGame);
            return apiGame
        } else if (location === '/home/myGames') {
            const myGames = [...allVideoGameFetch].filter((videoGames) => String(videoGames.id).length > 10)
            return myGames
        } else
            return allVideoGameFetch
    }
    const allVideoGames = allVideoGameF()
    console.log(allVideoGames);
    const currentPage = useSelector((state) => state.infoSearch.currentPage)


    const dispatch = useDispatch()

    const finalVideoGame = () => {

        if (infoSearch.length > 0) {
            console.log(infoSearch);
            const filteredVideoGames = [...allVideoGames].filter((game) => game.nombre.toLowerCase().includes(infoSearch.toLowerCase()))
            return filteredVideoGames
        } else {
            return allVideoGames
        }
    }
    const videoGamesForScreen = finalVideoGame()

    const itemsPerPage = 15

    const lastItem = currentPage * itemsPerPage
    const firstItem = lastItem - itemsPerPage
    const currentsVideoGames = [...videoGamesForScreen]?.slice(firstItem, lastItem)


    console.log(currentPage);
    const changePagination = (page) => dispatch(changeCurrentPage(page))

    useEffect(() => {
        dispatch(orderForAllCards())
    }, [])
    return (
        <>
            <div className="backgroundAllCards">
                <div className='filterDown'></div>
                <div className='allCardsContainer'>
                    {currentsVideoGames.map((game) => {
                        return <>
                                <Card
                                    nombre={game?.nombre}
                                    imagen={game?.imagen}
                                    lanzamiento={game?.lanzamiento}
                                    rating={game?.rating}
                                    genre={game?.genres}
                                    id={game?.id}
                                    descripción={game?.descripción}
                                    plataformas={game?.plataformas}
                                    loading={loading}
                                    setLoading={() => {
                                        setLoading(false)
                                        setTimeout(() => {
                                            setLoading(true)
                                        }, 200)
                                    }}
                                />
                        </>
                    })}
                </div>
                <div className='pagination'>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={videoGamesForScreen?.length}
                        page={changePagination}
                        currentPage={currentPage}
                        setLoading={() => setLoading()}
                    />
                </div>
            </div>
        </>
    )
}

export default CardsAll