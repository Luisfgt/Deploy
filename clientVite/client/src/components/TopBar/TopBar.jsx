import { useRef, useState } from 'react'
import './TopBar.css'




const TopBar = ({ aboutRef, figmaRef, openModal, modal, openModalLogin, modalLogin }) => {
    //hooks
    if(modal) return null
    if(modalLogin) return null
    const miHomeRef = useRef(null)
    const [buttonState, setButtonState] = useState({
        home: true,
        AboutMe: false,
        Figma: false
    })

    const scrollTo = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <div className='barContainer'>
                <div className='filterTop'></div>
                <div className='buttonsContainer'>
                    <div
                        className={buttonState.home ? 'barButtonSelect' : 'barButtons'}
                        onClick={() => {
                            scrollTo(miHomeRef)
                            setButtonState({
                                ...buttonState,
                                home: true,
                                AboutMe: false,
                                Figma: false
                            })
                        }}
                    >Home</div>
                    <div
                        className={buttonState.AboutMe ? 'barButtonSelect' : 'barButtons'}
                        onClick={() => {
                            scrollTo(aboutRef)
                            setButtonState({
                                ...buttonState,
                                home: false,
                                AboutMe: true,
                                Figma: false
                            })
                        }}
                    >About Me</div>
                    <div
                        className={buttonState.Figma ? 'barButtonSelect' : 'barButtons'}
                        onClick={() => {
                            scrollTo(figmaRef)
                            setButtonState({
                            ...buttonState,
                            home: false,
                            AboutMe: false,
                            Figma: true
                        })}}
                    >Figma</div>

                </div>
                <div className='loginButtons'>
                    <div onClick={() => openModal()} className='SUp'>Sign Up</div>
                    <div onClick={() => openModalLogin()} className='SIn' >Sign In</div>
                </div>
            </div>
            <div ref={miHomeRef} className='homeRef'></div>
        </>
    )
}

export default TopBar