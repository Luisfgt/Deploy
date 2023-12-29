import Select from "react-select"

const SelectVar = ({options,value, onChange}) => {

    

    return (
        <>
            <Select
                options={optionsGenres}
                styles={customStyles}
                value={allGenders}
                onChange={handleChange}
            />
        </>
    )
}

export default SelectVar