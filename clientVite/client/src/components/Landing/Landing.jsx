import './Landing.css'
import luisCard from '../../assets/LUIS CARD.png'
import { Link, scroller, Element } from 'react-scroll'
import { useEffect, useRef, useState } from 'react'
import TopBar from '../TopBar/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { setReferences, setScreen } from '../../redux/reducers/videogameSlice'
import ModalLogin from '../Modals/modalLogin'
import ModalRegister from '../Modals/modalRegister'
import Select from 'react-select'



const Landing = ({ login, logout }) => {

    // const [pageP, setPageP] = useState('home')

    const aboutMeRef = useRef(null)
    const homeRef = useRef(null)
    const figmaRef = useRef(null)
    const [modal, setModal] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)

    // Lógica para que la página funcione con un smooth scroll, pero que haré después
    // const handleScroll = (scroll = null, scrolled) => {
    //     console.log(scrolled);
    //     const scrollY = () => {
    //         if(!scrolled) return window.scrollY
    //         else scroll
    //     } 
    //     console.log(pageP);
    //     const scrollOnY = scrollY()
    //     console.log(scrollOnY);


    //     if (pageP === 'home' && scrollOnY > 150 && scrollOnY < 250) {
    //         scroller.scrollTo('aboutSection', {
    //             duration: 200,
    //             smooth: true
    //         })
    //         setTimeout(() => {
    //             window.removeEventListener('scroll', handleScroll);
    //             setPageP('about')
    //         }, 500);
    //     }
    //     if (pageP === 'about' && scrollOnY > 1050 && scrollOnY < 1100) {
    //         scroller.scrollTo('homeSection', {
    //             duration: 200,
    //             smooth: true
    //         })
    //         setTimeout(() => {
    //             window.removeEventListener('scroll', handleScroll);
    //             setPageP('home')
    //         }, 500);
    //     }

    //     if (pageP === 'about' && scrollOnY > 1101 && scrollOnY < 1200) {
    //         scroller.scrollTo('figma', {
    //             duration: 200,
    //             smooth: true
    //         })
    //         setTimeout(() => {
    //             window.removeEventListener('scroll', handleScroll);
    //             setPageP('figma')
    //         }, 500);
    //     }

    //     if (pageP === 'figma' && scrollOnY > 1990 && scrollOnY < 2050) {
    //         scroller.scrollTo('aboutSection', {
    //             duration: 200,
    //             smooth: true
    //         })

    //         window.removeEventListener('scroll', handleScroll);
    //         setTimeout(() => {
    //             setPageP('about')
    //         }, 500);
    //     }
    // }
    // useEffect(() => {

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [pageP]);

    useEffect(() => {
        logout()
    }, [])

    return (
        <>
            <div className='landingContainer'>
                <ModalRegister
                    openModal={modal}
                    closeModal={() => setModal(false)}
                />
                <ModalLogin
                    openModal={modalLogin}
                    closeModal={() => setModalLogin(false)}
                    login={login}
                />
                <TopBar
                    style={{ zIndex: '100' }}
                    aboutRef={aboutMeRef}
                    figmaRef={figmaRef}
                    openModal={() => setModal(true)}
                    openModalLogin={() => setModalLogin(true)}
                    modal={modal}
                    modalLogin={modalLogin}
                />
                <div className='background'>
                    <div className='backgroundAfter'></div>
                    <div className='filter'></div>
                    <Element name='homeSection'>
                        <div
                            ref={homeRef}
                            className='topPart'>
                            <div className='infoContain'>
                                <div className='frontText'>
                                    <div className='textC'>
                                        <h1 className='principalT'>WELCOME</h1>
                                        <h1 className='secundaryT'>TO</h1>
                                    </div>
                                    <div className='textC'>
                                        <h1 className='secundaryT'>OUR</h1>
                                        <h1 className='principalT'>PASSIONATE</h1>
                                    </div >
                                    <div className='textC'>
                                        <h1 className='principalT' >PLATFORM</h1>
                                        <h1 className='secundaryT'>FOR</h1>
                                    </div>
                                    <h1 className='principalT'>VIDEO GAMES!</h1>
                                </div>
                                <div className='tyb'>
                                    <p className='parrafo'>
                                        Immerse yourself in a world where information about your favorite video games comes to life.
                                    </p>
                                    <div onClick={() => {
                                        setModal(true)
                                    }} className='buttonLanding'>Sign Up</div>
                                </div>
                            </div>
                        </div>
                    </Element>
                    <div
                        ref={aboutMeRef}
                        className='aboutMe'>
                        <Element className='aboutMe' name='aboutSection'>
                            <div className='image'>
                                <img className='imageF' src={luisCard} alt="Luis" />
                            </div>
                            <div className='textContainer'>
                                <div className='textAbout'>ABOUT ME</div>
                                <div className='paragraphAbout'>I'm Luis González, a UI/UX designer & full-stack developer. Passionate about crafting seamless, user-centric experiences that bridge design and functionality. Let's create something amazing!</div>
                            </div>
                        </Element>
                    </div>
                    <div
                        ref={figmaRef}
                        className='figma'>
                        <Element name='figma'>
                            <div className='figmaVision'>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    }}>
                                    <div className='textAbout'> FIGMA </div>
                                    <div style={{
                                        fontSize: '1.2rem',
                                        position: 'relative',
                                        transform: 'translate(0px, -8px)'
                                        }} className='paragraphAbout'> APP DESIGN </div>
                                </div>
                                <iframe
                                    style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                                    width="800"
                                    height="450"
                                    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNg0ilrLzqD6P4uYjvHOr6T%2FLUIS-GONZALEZ-PI%3Ftype%3Ddesign%26node-id%3D2%253A51%26mode%3Ddesign%26t%3Dkqcj2Lba6XzO6DkN-1"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </Element>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Landing