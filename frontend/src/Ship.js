import { useState } from "react";
import { Link } from "react-router-dom";
function Ship(props) {

    const { item, onSave, onDelete, setSelectedShip } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [displacement, setDisplacement] = useState(item.displacement);

    const seeCrew = (event) => {
        setSelectedShip(item);
    }
    const deleteShip = (event) => {
        onDelete(item.id);
    }

    const edit = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const saveShip = () => {
        onSave(item.id, {
            name,
            displacement
        })
        setIsEditing(false);
    }

    return (
        <div>
            {
                isEditing ? (
                    <>
                        I am editing right now
                        <div>
                            <input type='text' placeholder='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                            <input type='number' placeholder='displacement' value={displacement} onChange={(evt) => setDisplacement(evt.target.value)} />
                        </div>
                        <input type='button' value='cancel' onClick={cancel} />
                        <input type='button' value='save' onClick={saveShip} />
                    </>
                ) : (
                    <>
                        <div>
                            i have the name <a className="movie-title">{item.name}</a>  and my genre is <span className="movie-category">{item.displacement} </span>
                        </div>
                        <div>
                            <input type='button' value='delete' onClick={deleteShip} />
                            <input type='button' value='edit' onClick={edit} />
                            <input type='button' value='seeCrew' onClick={seeCrew} />
                            <div><Link to={`/crew/${item.id}`}>See the list of crew names for this ship</Link></div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Ship