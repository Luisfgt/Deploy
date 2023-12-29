import { useState } from "react"
import './Modals.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://deploy-production-3bca.up.railway.app'
const URL = '/users'


const ModalRegister = ({ openModal, closeModal }) => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        passwordRepeated: ''
    })
    if (!openModal) return null

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const createUser = async () => {
        try {
            const { name, email, password, passwordRepeated } = data
            const finalPassword = () => {
                if(password === passwordRepeated){
                    return password
                }
            }
            const passwordUse = finalPassword()
            const createdUser = await axios.post(URL, {name, email, passwordUse})
            if(createdUser.status) {
                closeModal()
                setData({
                    name: '',
                    email: '',
                    password: '',
                    passwordRepeated: ''
                })
            }
        } catch (error) {

        }
    }


    return (
        <>
            <div className="modalBackground">
                <div className="backG">
                    <div className="title">Sign Up</div>
                    <div className="labelEInput">
                        <div className="containerName">
                            <label className="subtitles" htmlFor="">Name</label>
                            <input name="name" className="inputs" onChange={handleChange} value={data.name} type="text" />
                        </div>
                        <div className="containerName">
                            <label className="subtitles" htmlFor="">Email</label>
                            <input name="email" className="inputs" onChange={handleChange} value={data.email} type="text" />
                        </div>
                        <div className="containerName">
                            <label className="subtitles" htmlFor="">Password</label>
                            <input name="password" className="inputs" onChange={handleChange} value={data.password} type="text" />
                        </div>
                        <div className="containerName">
                            <label className="subtitles" htmlFor="">Repeat Password</label>
                            <input name="passwordRepeated" className="inputs" onChange={handleChange} value={data.passwordRepeated} type="text" />
                        </div>
                        <div className="containerButtons">
                            <div className="butonCancel" onClick={() => closeModal()}> Cancel </div>
                            <div className="butonReg" onClick={() => createUser()} > Register </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRegister