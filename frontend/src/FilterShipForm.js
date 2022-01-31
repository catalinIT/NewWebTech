import { useState } from "react";

 function FilterShipForm(props) {

    const { onFilter, setFiltered, setSorted } = props 
    const [displacement, setDisplacement] = useState(0);
    const [initial, setInitial] = useState('');

    const filter = (event) => {
        onFilter(
            displacement,
            initial
        )
    }

    const clearFilter = (event) => {
        setSorted(false);
        setFiltered(false);
    }

    const sortTitles = (event) => {
        setFiltered(false);
        setSorted(true);
    }

    return (
        <div>
            <div>
                <div>
                    <h3>Filter Ships</h3>
                    <label for="movie-select">Choose a minimum displacement:</label>
                    <input type='number' placeholder='displacement' value={displacement} onChange={(evt) => setDisplacement(evt.target.value)} />
                </div>
                <div>
                    <label for="release">Get the ships with a certain initial letter:</label>

                    <input type='text' placeholder='initial letter' value={initial} onChange={(evt) => setInitial(evt.target.value)} />
                </div>
                <div>
                    <input type='button' value='filer me!' onClick={filter}/>
                    <input type='button' value='clear filter' onClick={clearFilter} />
                    <input type='button' value='sort alphabetically' onClick={sortTitles} />
                </div>
            </div>
        </div>
    )

 }

 export default FilterShipForm;