import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import Card from "../Home/Card/Card"
import { getAllVideoGames, setFilterGames } from "../../redux/reducers/videogameSlice"
import validate from "./validateInfo"
axios.defaults.baseURL = 'https://deploy-production-3bca.up.railway.app/'
const URL_CREATE = '/videogames'
const URL_GET_ALL = '/videogames'


const ModalCreateVideoGame = ({ modal, closeModal }) => {
    console.log(modal);
    if (!modal) return null

    const [loading, setLoading] = useState(false)
    const allGenres = useSelector((state) => state.videogames.allGenres)
    const [optionsGenres, setOptionGenres] = useState([])
    console.log(optionsGenres);
    const dispatch = useDispatch()
    const [isSendedFirstTime, setIsSendedFirstTime] = useState(false)

    const [initialData, setInitialData] = useState({
        nombre: null,
        descripción: null,
        plataformas: null,
        imagen: null,
        lanzamiento: null,
        rating: null,
        ratingDecimal: null
    })
    const [errorsData, setErrorsData] = useState({
        nombre: null,
        descripción: null,
        plataformas: null,
        lanzamiento: null,
        rating: null,
        ratingDecimal: null,
    })

    const getAllVideoGamesBackend = async () => {
        try {
            const allGames = (await axios(URL_GET_ALL)).data
            if (allGames.data) {
                setLoading(false)
                dispatch(getAllVideoGames(allGames.data))
                dispatch(setFilterGames())
            } else {
                setLoading(false)
                alert(allGames.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }


    const [selectedGenres, setSelectedGenres] = useState([]);
    const genre = selectedGenres.map((genre) => genre.value).join(', ')



    const styleGenres = {
        container: provided => ({
            ...provided,
            width: '100%',
        }),
        control: provided => ({
            ...provided,
            backgroundColor: 'none',
            borderRadius: '0rem',
            border: 'none',
            borderBottom: '1px solid white'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white'
        })
    }

    const styleGenresError = {
        container: provided => ({
            ...provided,
            width: '100%',
        }),
        control: provided => ({
            ...provided,
            backgroundColor: 'none',
            borderRadius: '0rem',
            border: 'none',
            borderBottom: '1px solid rgb(255, 98, 98)'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white'
        })
    }

    const numberValues = Array.from({ length: 6 }, (_, index) => index).map((number) => {
        const value = {
            value: number,
            label: number,
            name: 'rating'
        }
        return value
    })

    const numberValues2 = Array.from({ length: 100 }, (_, index) => index).map((number) => {
        const value = {
            value: number,
            label: number,
            name: 'ratingDecimal'

        }
        return value
    })

    console.log(numberValues)


    
    const handleGenrss = (eventInfo) => {
        const limit = 3;

        if (eventInfo.length <= limit) {
            setSelectedGenres(eventInfo)
        }
        console.log(eventInfo);
        console.log(selectedGenres);

        if (isSendedFirstTime) {
            const {
                nombre,
                descripción,
                plataformas,
                rating,
                ratingDecimal,
                lanzamiento
            } = initialData

            console.log(nombre);
            const validacionData = validate({
                nombre,
                descripción,
                plataformas,
                lanzamiento,
                rating,
                ratingDecimal,
                Genres: eventInfo
            })

            if (Object.keys(validacionData).length !== 0) {
                return setErrorsData({
                    ...errorsData,
                    nombre: validacionData.nombre,
                    descripción: validacionData.descripción,
                    plataformas: validacionData.plataformas,
                    lanzamiento: validacionData.lanzamiento,
                    rating: validacionData.rating,
                    ratingDecimal: validacionData.ratingDecimal,
                    noHayErrores: validacionData.noHayErrores,
                    Genres: validacionData.Genres
                })
            }
        }

    };


    const optionsGenders = async () => {
        const genresFinal = await Promise.all(allGenres?.map((genre) => {
            return { value: genre[0]?.nombre, label: genre[0]?.nombre }
        }))
        genresFinal.unshift({ value: 'all', label: 'all' })
        console.log();

        setOptionGenres([...genresFinal])
    }

    useEffect(() => {
        optionsGenders()
    }, [])

    const createGame = async () => {
        try {
            setIsSendedFirstTime(true)
            const { nombre, descripción, plataformas, imagen, lanzamiento, rating, ratingDecimal } = initialData

            const validacionData = validate({
                nombre,
                descripción,
                plataformas,
                lanzamiento,
                rating,
                ratingDecimal,
                Genres: selectedGenres
            })
            console.log(validacionData);
            console.log(Object.keys(validacionData).length !== 1);
            if (!errorsData.noHayErrores) {
                alert('Hay errores')
                return setErrorsData({
                    ...errorsData,
                    nombre: validacionData.nombre,
                    descripción: validacionData.descripción,
                    plataformas: validacionData.plataformas,
                    lanzamiento: validacionData.lanzamiento,
                    rating: validacionData.rating,
                    ratingDecimal: validacionData.ratingDecimal,
                    Genres: validacionData.Genres

                })
            }


            console.log(validacionData);


            const numberRating = () => {
                if (!ratingDecimal) {
                    const finalNumber = `${rating}.${0}`
                    return finalNumber
                }
                const finalNumber = `${rating}.${ratingDecimal}`
                console.log(ratingDecimal);
                return finalNumber
            }


            const finalGenres = selectedGenres.map((genre) => genre.value)

            const data = {
                nombre,
                descripción,
                plataformas,
                imagen,
                lanzamiento,
                rating: Number(numberRating()),
                Genres: finalGenres
            }
            console.log(data);
            const createdGame = (await axios.post(URL_CREATE, { data })).data



            if (createdGame.status) {
                setLoading(true)
                await getAllVideoGamesBackend()
                closeModal()
                setInitialData({
                    nombre: '',
                    descripción: '',
                    plataformas: '',
                    imagen: '',
                    lanzamiento: '',
                    rating: '',
                })
            } else {
                alert(createdGame.message)
            }


        } catch (error) {
            return error.message
        }
    }

    const handleChange = (event) => {
        if(event.target.name === 'lanzamiento') setIsSendedFirstTime(true)
        setInitialData({
            ...initialData,
            [event.target.name]: event.target.value
        })

        if (isSendedFirstTime) {
          const { nombre, descripción, plataformas, imagen, lanzamiento, rating, ratingDecimal } = initialData
            
            const validacionData = validate({
                nombre,
                descripción,
                plataformas,
                lanzamiento,
                rating,
                ratingDecimal,
                Genres: selectedGenres
            })

            if (Object.keys(validacionData).length !== 0) {
                return setErrorsData({
                    ...errorsData,
                    nombre: validacionData.nombre,
                    descripción: validacionData.descripción,
                    plataformas: validacionData.plataformas,
                    lanzamiento: validacionData.lanzamiento,
                    rating: validacionData.rating,
                    ratingDecimal: validacionData.ratingDecimal,
                    noHayErrores: validacionData.noHayErrores,
                    Genres: validacionData.Genres
                })
            }
        }


    }

    const handleChangeRating = (eventInfo) => {
        console.log(initialData.rating);
        console.log(eventInfo);
        setInitialData({
            ...initialData,
            [eventInfo.name]: eventInfo.value
        })
        if (isSendedFirstTime) {
            const validacionData = validate({
                ...initialData,
                [eventInfo.name]: eventInfo.value
            })

            if (Object.keys(validacionData).length !== 0) {
                return setErrorsData({
                    ...errorsData,
                    nombre: validacionData.nombre,
                    descripción: validacionData.descripción,
                    plataformas: validacionData.plataformas,
                    lanzamiento: validacionData.lanzamiento,
                    rating: validacionData.rating,
                    ratingDecimal: validacionData.ratingDecimal,
                    noHayErrores: validacionData.noHayErrores
                })
            }
        }
    }

    console.log(
        validate({
            nombre: '',
            descripción: '',
            plataformas: '',
            lanzamiento: '',
            rating: '',
            ratingDecimal: '',
            Genres: ''
        })
    )


    return (
        <>
            <div className="backgroundCreateVideogame">
                {loading ? <div className="loaderCharge"></div> :
                    <div className="fullContainer">
                        <div className="formContainerCreate">
                            <div className="title"> Create Game </div>
                            <div className="labelAndInputCreate">
                                <label className="subtitles" htmlFor="">Videogame name</label>
                                <input
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    name="nombre"
                                    className={errorsData.nombre ? 'inputsErrors' : 'inputs'}
                                    type="text"
                                />
                                {errorsData.nombre && <span className="span">{errorsData.nombre}</span>}
                            </div>
                            <div className="labelAndInputCreate">
                                <label className="subtitles" htmlFor="">Description</label>
                                <input onChange={handleChange}
                                    name="descripción"
                                    className={errorsData.descripción ? 'inputsErrors' : 'inputs'}
                                    type="text" />
                                {errorsData.descripción && <span className="span">{errorsData.descripción}</span>}
                            </div>
                            <div className="labelAndInputCreate">
                                <label className="subtitles" htmlFor="">Genres</label>
                                <Select
                                    isMulti
                                    styles={errorsData.Genres ? styleGenresError : styleGenres}
                                    options={optionsGenres}
                                    value={selectedGenres}
                                    onChange={handleGenrss}
                                />
                            </div>
                            <div className="labelAndInputCreate">
                                <label className="subtitles" htmlFor="">Platforms</label>
                                <input
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    name="plataformas"
                                    className={errorsData.plataformas ? 'inputsErrors' : 'inputs'}
                                    type="text" />
                                {errorsData.plataformas && <span className="span">{errorsData.plataformas}</span>}
                            </div>
                            <div className="labelAndInputCreate">
                                <label className="subtitles" htmlFor="">Url Image (optional)</label>
                                <input
                                    onChange={handleChange}
                                    name="imagen"
                                    className={'inputs'}
                                    type="text" />
                            </div>
                            <div className="labelAndInputCreate">
                                <label className="subtitles" htmlFor="">Rating</label>
                                <div className="ratingSelect">
                                    <Select
                                        styles={errorsData.rating ? styleGenresError : styleGenres}
                                        options={numberValues}
                                        value={{ value: initialData.rating, label: initialData.rating }}
                                        onChange={handleChangeRating}
                                    />
                                    <Select
                                        styles={errorsData.ratingDecimal ? styleGenresError : styleGenres}
                                        options={numberValues2}
                                        value={{ value: initialData.ratingDecimal, label: initialData.ratingDecimal }}
                                        onChange={handleChangeRating}
                                    />
                                </div>
                            </div>
                            <div className="labelAndInputCreate">
                                <label className="subtitles" htmlFor="">Released</label>
                                <input
                                    onBlur={handleChange}
                                    onChange={handleChange}
                                    name="lanzamiento"
                                    className={errorsData.lanzamiento ? 'inputsErrors' : 'inputs'}
                                    type="text" />
                                {errorsData.lanzamiento && <span className="span">{errorsData.lanzamiento}</span>}
                            </div>
                            <div className="containerButtons">
                                <div onClick={() => {
                                    closeModal()
                                    setInitialData({
                                        nombre: '',
                                        descripción: '',
                                        plataformas: '',
                                        imagen: '',
                                        lanzamiento: '',
                                        rating: '',
                                    })
                                    setSelectedGenres([])
                                }} className="butonCancel"> Cancel </div>
                                <div onClick={() => createGame()} className="butonReg"> Create </div>
                            </div>
                        </div>
                        <div className="previewCard">
                            <Card
                                nombre={initialData.nombre}
                                imagen={initialData.imagen}
                                lanzamiento={initialData.lanzamiento}
                                rating={`${initialData.rating}.${initialData.ratingDecimal}`}
                                genre={genre}
                                id={'Luis'}
                                loading={() => console.log('hola')}
                                setLoading={(falsess) => console.log('hola', falsess)}
                            />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


export default ModalCreateVideoGame