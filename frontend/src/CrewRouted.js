import React, { useEffect } from "react"
import { Component } from "react"
import { useParams } from 'react-router';
import { useState } from "react";
import CrewDetails from "./CrewDetails";
import store from "./ShipStore";
import CrewRoutedElement from "./CrewRoutedElement";
function CrewRouted() {

    const { id } = useParams();
    const [crewMembers, setCrewMembers] = useState([]);
    useEffect(() => {
        store.getCrewMembers(id);
        store.emitter.addListener('GET_CREW_SUCCESS', () => {
            setCrewMembers(store.crewData);
        })
    }, [])


    return (
        <div>
            {
                crewMembers.map((e) => <CrewRoutedElement key={e.id} item={e}/>)
            }
        </div>
    )

}

//crewMembers.map((e) => <CrewDetails key={e.id} item={e} onDeleteCrewMember={onDeleteCrewMember} />) : <div></div>
export default CrewRouted;
