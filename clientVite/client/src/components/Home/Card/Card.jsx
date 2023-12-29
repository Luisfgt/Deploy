import { useEffect, useState } from "react"
import { iconsObj } from "../../../assets/Icons/IconsImport"
import './Card.css'
import ModalDetail from "../../Modals/ModalDetail"
import { useLocation } from "react-router"


const Card = ({ nombre, imagen, lanzamiento, rating, genre, id, descripción, plataformas, loading, setLoading}) => {
    const [modal, setModal] = useState(false)
    const oneGenre = genre?.split(',')[0]
    const location = useLocation().pathname
    const temporalDiv = document.createElement('div');
    temporalDiv.innerHTML = descripción;
    const descriptionClean = temporalDiv.textContent
    const colors = {
        "Board Games": 'rgba(102, 51, 0, 1)',
        "Simulation": 'rgba(0, 204, 102, 1)',
        "Strategy": 'rgba(255, 153, 0, 1)',
        "Action": 'rgba(153, 102, 255, 1)',
        "Casual": 'rgba(102, 153, 255, 1)',
        "Arcade": 'rgba(255, 204, 0, 1)',
        "Massively Multiplayer": 'rgba(153, 0, 255, 1)',
        "Shooter": 'rgba(255, 51, 0, 1)',
        "Educational": 'rgba(102, 204, 255, 1)',
        "Adventure": 'rgba(204, 0, 255, 1)',
        "Sports": 'rgba(255, 102, 102, 1)',
        "Fighting": 'rgba(255, 102, 153, 1)',
        "Card": 'rgba(255, 102, 0, 1)',
        "Racing": 'rgba(153, 102, 255, 1)',
        "Indie": 'rgba(153, 255, 102, 1)',
        "Family": 'rgba(51, 0, 204, 1)',
        "RPG": 'rgba(204, 51, 0, 1)',
        "Platformer": 'rgba(255, 102, 0, 1)',
        "Puzzle": 'rgba(107, 91, 205, 1)',
    }
    const colorOfGenre = colors[oneGenre]


    const character = {
        imagen,
        nombre,
        lanzamiento,
        rating,
        icon: iconsObj.ratingIcon,
        descripción: descriptionClean,
        plataformas,
        genre,
        id
    }
    const seteador = () => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>

            {modal &&
                <div className="cardDetails">
                    <ModalDetail
                        closeModal={() => setModal(false)}
                        modal={modal}
                        character={character}
                    />
                </div>
            }

            <>
                <div onClick={() => setModal(true)} className="container" style={location !== '/home' ? { transform: `scale(${0.95})` } : { transform: `scale(${1})` }}>
                    <div className="sideRectangle" style={{ background: `${colorOfGenre}` }}>
                        <div className="contGenereText">
                            <div className="textOfId">{id}</div>
                            <img className='iconsGenre' src={iconsObj.arcadeIcons} alt="" />
                        </div>
                    </div>
                    <div className="filter2"></div>
                    <div className="imageBack">
                        <div>
                            {!loading &&
                                <div className="chargerLoaderCard">
                                    <div className="loaderCharge"></div>
                                </div>
                            }
                            <img
                                className={!loading ? "none" : "imageIn"}
                                src={imagen}
                                alt=""
                                onLoad={seteador}
                            />
                        </div>
                    </div>
                    <div className="textContainer2">
                        <div className="nameLanza">
                            <div className="effect"></div>
                            <div className="textName">{nombre}</div>
                            <div className="lanzamiento">{genre}</div>
                        </div>
                        <div className="ratingF">
                            <div className="ratingText">{rating}</div>
                            <img className="icons" src={iconsObj.ratingIcon} alt="rating" />
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default Card