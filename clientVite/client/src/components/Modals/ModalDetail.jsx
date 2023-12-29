import { iconsObj } from "../../assets/Icons/IconsImport"


const ModalDetail = ({ modal, closeModal, character }) => {
    if (!modal) return null

    return (
        <>
            <div className="backgroundModalDetail">
                <div className="detailContainer">
                    <div className="imageContainer">
                        <div className="filterImage"></div>
                        <img className="imageDetail" src={character.imagen} alt="imagen" />
                        <div className="textContainerDetail">
                            <div className="nameDetail">{character.nombre}</div>
                            <div className="ratingAndIcon">
                                <div className="ratingNumber" >{character.rating}</div>
                                <img className="iconsDetail" src={character.icon} alt="img" />
                            </div>
                        </div>
                    </div>
                    <div className="infoDetailContainer">
                        <div className="closeModalContainer">
                            <div className="closeModalDetail">
                                <div className="botosAtras" onClick={() => closeModal()}>
                                    <div className="atrasSi">
                                        Back
                                    </div>
                                    <img className="iconsDetail" src={iconsObj.arrowSlide} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="principalInfo">
                            <div className="titleAndInfo">
                                <h1 className="titleDetail"> Description </h1>
                                <p className="paragraphDetail">{character.descripción}</p>
                            </div>
                            <div className="platformAndRealease">
                                <div className="titleAndInfo">
                                    <h1 className="titleDetail"> Platforms </h1>
                                    <p className="paragraphDetail">{character.plataformas}</p>
                                </div>
                                <div className="titleAndInfo">
                                    <h1 className="titleDetail"> Released </h1>
                                    <p className="paragraphDetail">{character.lanzamiento}</p>
                                </div>
                            </div>
                        </div>
                        <div className="genresAndIdDetail">
                            <div className="infoGenId">{character.genre}</div>
                            <div className="infoGenId">{character.id}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDetail