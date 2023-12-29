import { useDispatch, useSelector } from 'react-redux'
import './SelectComponent.css'
import Select from 'react-select'
import { useEffect, useState, React } from 'react'
import { filterByGender, orderGames, setFilterGames, updateFilters } from '../../../redux/reducers/videogameSlice'
import { changeCurrentPage } from '../../../redux/reducers/InfoSlice'
import { useLocation } from 'react-router'


const SelectComponent = () => {

  const [genders, setGenders] = useState([])
  const [optionsGenres, setOptionGenres] = useState([])
  const dispatch = useDispatch()
  const filterGames = useSelector((state) => state.videogames.filteredVideoGames)
  const allGenres = useSelector((state) => state.videogames.allGenres)
  const location = useLocation().pathname
  const [filters, setFilters] = useState({
    gender: '',
    order: ''
  })



  useEffect(() => {
    dispatch(updateFilters(filters))
  }, [filters])


  const optionsGenders = async () => {
    const genresFinal = await Promise.all(allGenres?.map((genre) => {
      return { value: genre[0]?.nombre, label: genre[0]?.nombre }
    }))
    genresFinal.unshift({ value: 'all', label: 'all' })


    setOptionGenres([...genresFinal])
  }

  console.log(optionsGenres);

  const handleChange = (selectedValues) => {
    dispatch(changeCurrentPage(1))
    setFilters({
      ...filters,
      gender: selectedValues.value
    })
  }

  const handleChangeOrder = (orderValue) => {
    setFilters({
      ...filters,
      order: orderValue.value
    })
  }


  useEffect(() => {
    optionsGenders()
  }, [location])

  console.log(optionsGenres);
  const customStyles = {
    container: provided => ({
      ...provided,
      width: '15rem',
    }),
    control: provided => ({
      ...provided,
      height: '3.5rem',
      borderRadius: '1rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      backgroundColor: '#342A45',
      color: 'white',
      boxShadow: '3px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      border: 'none',
      fontSize: '1rem',
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: '#342A45', // Color de fondo para el contenedor general
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2C243A' : '#342A45',
      color: 'white',
      ':hover': {
        background: 'linear-gradient(178deg, #892DFF 1.76%, #641EBD 79.32%)', // Color morado para el hover
        color: 'white',
      },
    }),
    placeholder: provided => ({
      ...provided,
      color: 'white',
    }),
    singleValue: provided => ({
      ...provided,
      color: 'white',
    }),
    indicatorSeparator: provided => ({
      ...provided,
      backgroundColor: '#342A45', // Color del fondo del contenedor
    }),
  };

  const optionsOrder = [
    { value: 'Ascendent', label: 'Ascendent' },
    { value: 'Descendent', label: 'Descendent' },
    { value: 'higherRatings', label: 'Higher Ratings' },
    { value: 'lowerRatings', label: 'Lower Ratings' }
  ]



  return (<>
    <div className='selectsContainer'>
      <Select
        options={optionsGenres}
        styles={customStyles}
        onChange={handleChange}
        placeholder={'Select a gender...'}
      />
      <Select
        options={optionsOrder}
        styles={customStyles}
        onChange={handleChangeOrder}
        placeholder={'Change Order...'}
      />

    </div>
  </>)
}

export default SelectComponent