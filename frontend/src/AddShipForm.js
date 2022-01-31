import { useState } from "react";

function AddShipForm(props) {
    const { onAdd } = props 
    const [name, setName] = useState('');
    const [displacement, setDisplacement] = useState(0);

    const add = (event) => {
        onAdd({
            name, 
            displacement
        })
        setName('');
        setDisplacement(0);
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                <input type='number' placeholder='displacement' value={displacement} onChange={(evt) => setDisplacement(evt.target.value)} />
                <div>
                    <input type='button' value='add me!' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddShipForm;
