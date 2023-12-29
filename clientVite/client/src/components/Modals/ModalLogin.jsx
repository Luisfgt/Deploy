import { useState } from "react"
import './Modals.css'
import axios from 'axios'
import { useNavigate } from "react-router"
import { useDispatch } from 'react-redux'
import { loginUser } from "../../redux/reducers/userSlice"
axios.defaults.baseURL = 'http://localhost:3009/'
const URL = '/users/users'


const ModalLogin = ({ openModal, closeModal, login }) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    if (!openModal) return null
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const loginTrue = async () => {
        try {
            console.log(data);
            const userJoined = (await axios.post(URL, { data })).data
            console.log(userJoined);
            if(userJoined.status) {
                const userToFront = {
                    id: userJoined.getUser.id,
                    email: userJoined.getUser.email
                }
                console.log(userToFront);
                dispatch(loginUser(userToFront))
                closeModal()
                setData({
                    email: '',
                    password: '',
                })
                login()
                navigate('/home')
            }
            
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <>
            <div className="modalBackground">
                <div className="backG">
                    <div className="title">Sign In</div>
                    <div className="labelEInput">
                        <div className="containerName">
                            <label className="subtitles" htmlFor="">Email</label>
                            <input name="email" className="inputs" onChange={handleChange} value={data.email} type="text" />
                        </div>
                        <div className="containerName">
                            <label className="subtitles" htmlFor="">Password</label>
                            <input name="password" className="inputs" onChange={handleChange} value={data.password} type="text" />
                        </div>
                        <div className="containerButtons">
                            <div className="butonCancel" onClick={() => {
                                closeModal()
                                setData({
                                    email: '',
                                    password: '',
                                })
                                }}> Cancel </div>
                            <div className="butonReg" onClick={() => loginTrue()} > Login </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalLogin