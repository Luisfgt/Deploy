const validate = (data) => {
    const { nombre, descripción, plataformas, lanzamiento, rating, ratingDecimal, Genres} = data
    const errors = {
    }
    console.log(data);

    if(!Genres || Genres.length === 0) errors.Genres = 'Debes elegir al menos un género'
    if(!rating) errors.rating = 'Debes escribir un nombre'
    if(!ratingDecimal) errors.ratingDecimal = 'Debes escribir un nombre'
    if(!nombre) errors.nombre = 'Debes elegir un rating'
    if(!descripción) errors.descripción = 'Escribe una descripción'
    if(!plataformas) errors.plataformas = 'Debes indicar al menos una plataforma'
    if(!lanzamiento) errors.lanzamiento = 'Indica cuando se creó'
    if(Object.keys(errors).length === 0){
        errors.noHayErrores = 'NoHay'
    } 
    console.log(errors);

    return errors
}

export default validate