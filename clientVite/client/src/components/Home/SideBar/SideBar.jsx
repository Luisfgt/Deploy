import { useDispatch, useSelector } from 'react-redux'
import { iconsObj } from '../../../assets/Icons/IconsImport'
import './SideBar.css'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { setFilterGames } from '../../../redux/reducers/videogameSlice'
import { changeCurrentPage } from '../../../redux/reducers/InfoSlice'


const SideBar = () => {

    const dispatch = useDispatch()
    const location = useLocation().pathname
    console.log(location);
    const changePagination = () => dispatch(changeCurrentPage(1))


    return (
        <>
            <div className="sideBarContainer">
                <div className='spaceButtons'>
                    <Link to='/home' style={{ textDecoration: 'none' }} >
                        <div className={location === '/home' ? 'buttonSideOnClick' : 'buttonSide'}>
                            <img className='icons' src={iconsObj.multiplayerIcon} alt="" />
                            <h2 className='textButton'>News</h2>
                        </div>
                    </Link>
                    <Link Link to='/home/myGames' style={{ textDecoration: 'none' }}>
                        <div onClick={() => {
                            dispatch(setFilterGames())
                            changePagination()
                        }} className={location === '/home/myGames' ? 'buttonSideOnClick' : 'buttonSide'}>
                            <img className='icons' src={iconsObj.PuzzleIcon} alt="" />
                            <h2 className='textButton'>My Games</h2>
                        </div>
                    </Link>
                    <Link to='/home/apiGames' style={{ textDecoration: 'none' }}>
                        <div onClick={() => {
                            dispatch(setFilterGames())
                            changePagination()
                        }} className={location === '/home/apiGames' ? 'buttonSideOnClick' : 'buttonSide'}>
                            <img className='icons' src={iconsObj.viejoIcon} alt="" />
                            <h2 className='textButton'>API Games</h2>
                        </div>
                    </Link>
                    <Link to='/home/allGames' style={{ textDecoration: 'none' }}>
                        <div onClick={() => {
                            dispatch(setFilterGames())
                            changePagination()
                        }} className={location === '/home/allGames' ? 'buttonSideOnClick' : 'buttonSide'}>
                            <img className='icons' src={iconsObj.arcadeIcons} alt="" />
                            <h2 className='textButton'>All Games</h2>
                        </div>
                    </Link>

                </div>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className='logOut'>
                        <h2 className='textButton'>Log-Out</h2>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default SideBar