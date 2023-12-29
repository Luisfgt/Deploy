import { useDispatch, useSelector } from 'react-redux'
import './TopBarHome.css'
import { useLocation } from 'react-router'
import { changeInfo } from '../../../redux/reducers/InfoSlice'
import SelectComponent from '../SelectComponent/SelectComponent'


const TopBarHome = ({ openModalCreate }) => {
    console.log(openModalCreate);

    const user = useSelector((state) => state.users).userInfo
    const infoSearch = useSelector((state) => state.infoSearch.searchInfo)

    console.log(infoSearch);
    const location = useLocation().pathname
    console.log(user);

    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(changeInfo(event.target.value))
    }




    return (
        <>
            <div className="backgroundTopBarHome">
                <div className='user'>{user.email}</div>
                {location !== '/home' &&
                    <div className='filters'>
                        <input value={infoSearch} onChange={handleChange} className='search' placeholder='Search game' />

                        {/* <select className='buttonsFilter' placeholder='Filter by'>
                            <option value="">Filter by gender</option> */}
                        <div className='selectOverAll'>
                            <SelectComponent />
                        </div>
                        {/* </select> */}
                        {location === '/home/myGames' && <div  onClick={openModalCreate} className='createButtom'>
                            <div style={{ fontSize: '1.6rem', position: 'relative', top: '-0.1rem' }}>+</div>
                            Create Game
                        </div>}
                    </div>}
            </div>
        </>
    )
}

export default TopBarHome