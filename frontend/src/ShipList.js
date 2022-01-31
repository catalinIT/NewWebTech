import { useEffect, useState } from "react";
import store from "./ShipStore";
import Ship from "./Ship.js";
import AddShipForm from "./AddShipForm";
import FilterShipForm from "./FilterShipForm";
import CrewDetails from "./CrewDetails";
import { Link } from "react-router-dom";

function ShipList(props) {
    const setList = props

    const [ships, setShips] = useState([]);
    const [areFiltered, setFiltered] = useState(false);
    const [areSorted, setSorted] = useState(false);
    const [selectedShip, setSelectedShip] = useState(null);
    const [crewMembers, setCrewMembers] = useState([]);

    useEffect(() => {
        if (selectedShip) {
            store.getCrewMembers(selectedShip.id);
            store.emitter.addListener('GET_CREW_SUCCESS', () => {
                setCrewMembers(store.crewData);
                setList(store.crewData);
            })
        }
        if (areFiltered) {
            store.emitter.addListener('GET_SHIPS_FILTER_SUCCESS', () => {
                setShips(store.data);
            })
        }
        else if (areSorted) {
            store.getSortedShips();
            store.emitter.addListener('GET_SHIPS_SORTED_SUCCESS', () => {
                setShips(store.data);
            })
        } else {
            store.getShips();
            store.emitter.addListener('GET_SHIPS_SUCCESS', () => {
                setShips(store.data);
            })
        }
    }, [areFiltered, areSorted, selectedShip])

    const addShip = (ship) => {
        store.addShip(ship);
    }

    const saveShip = (id, ship) => {
        store.saveShip(id, ship);
    }

    const deleteShip = (id) => {
        store.deleteShip(id);
    }

    const filterShip = (displacement, initial) => {
        store.filterShip(displacement, initial)
        setFiltered(true);
    }

    const addCrew = (name, role, shipId) => {
        store.addCrewMember(name, role, shipId);
    }

    const onDeleteCrewMember = (id, shipId) => {
        store.deleteCrewMember(id, shipId);
    }


    return (
        <div className="flex-container">
            <div>
                <div>
                    <h3>Add a Ship</h3>
                    <AddShipForm onAdd={addShip} />
                    <FilterShipForm onFilter={filterShip} setFiltered={setFiltered} setSorted={setSorted} />
                </div>
                <div>
                    <h2>Crew Members:</h2>
                    {selectedShip ?
                        crewMembers.map((e) => <CrewDetails key={e.id} item={e} onDeleteCrewMember={onDeleteCrewMember} />) : <div></div>
                    }
                    {selectedShip ?
                        <div></div> : <div></div>
                    }
                    {selectedShip ?
                        <div><Link to={`/crew/${selectedShip.id}`}>Go to live session (using the latest token)</Link></div> : <div></div>
                    }
                </div>
                <div>
                    <h3>list of ships</h3>
                    {
                        ships.map((e) => <Ship key={e.id} item={e} onSave={saveShip} onDelete={deleteShip} setSelectedShip={setSelectedShip}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ShipList;