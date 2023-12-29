import { useSelector } from 'react-redux'
import './Cards.css'
import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { iconsObj } from '../../../assets/Icons/IconsImport';


const CardsNews = () => {

    const gameOfDay = useSelector((state) => state.videogames).recentVideoGames
    console.log(gameOfDay);
    const recentGames = [...gameOfDay].slice(5, 17)
    const [imageFinished, setImageFinished] = useState(true)
    const [loading, setLoading] = useState(false)
    const [rem, setRem] = useState(0)
    console.log(rem);
    const aumRem = () => {
        setRem(rem - 74.4)
    }

    const dismRem = () => {
        if (rem === 0) return null
        else return setRem(rem + 74.4)
    }

    const setFin = () => {
        setInterval(() => {
            setImageFinished(false)
            setTimeout(() => {
                setImageFinished(true)
            }, 500);
        }, 39000);
    }

    useEffect(() => {
        setFin()
    }, [])


    return (
        <>
            <div className="backgroundCard">
                <div className='gameOfDayContainer'>
                    <div className='gameDayContainer'>
                        <div className='imagesCon'>
                            <img className={imageFinished ? 'imagecar' : 'none'} src={gameOfDay[0]?.imagen} alt="" />
                            <img className={imageFinished ? 'imagecar' : 'none'} src={gameOfDay[1]?.imagen} alt="" />
                            <img className={imageFinished ? 'imagecar' : 'none'} src={gameOfDay[2]?.imagen} alt="" />
                            <img className={imageFinished ? 'imagecar' : 'none'} src={gameOfDay[3]?.imagen} alt="" />
                            <img className={imageFinished ? 'imagecar' : 'none'} src={gameOfDay[4]?.imagen} alt="" />
                        </div>
                        <div className='textTimer'>
                            <div className={imageFinished ? 'name' : 'none'}>{gameOfDay[0]?.nombre}</div>
                            <div className={imageFinished ? 'name' : 'none'}>{gameOfDay[1]?.nombre}</div>
                            <div className={imageFinished ? 'name' : 'none'}>{gameOfDay[2]?.nombre}</div>
                            <div className={imageFinished ? 'name' : 'none'}>{gameOfDay[3]?.nombre}</div>
                            <div className={imageFinished ? 'name' : 'none'}>{gameOfDay[4]?.nombre}</div>
                        </div>
                        <div className='downFilter'></div>
                    </div>
                </div>
                <div className='cardsContainer'>
                    <div className='buttonAndTitleContainer'>
                        <div className='titleGames'> Recent Games </div>
                        <div className='buttonsSlideContainer'>
                            <button onClick={() => dismRem()} className='buttonSlider' disabled={rem === 0}>
                                <img className='iconsSliderIzq' src={iconsObj.arrowSlideIzq} alt="" />
                            </button>
                            <button onClick={() => aumRem()} className='buttonSlider' disabled={rem < -220}>
                                <img className='iconsSlider' src={iconsObj.arrowSlide} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className='filterCardsSlider'></div>
                    <div className='containerNewCards'>
                        <div className='newCards' style={{ marginLeft: `${rem}rem` }}>
                            {
                                recentGames.map((game) => {
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
                                            setLoading={setLoading}
                                        />

                                    </>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsNews