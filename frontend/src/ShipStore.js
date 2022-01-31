import { EventEmitter } from 'fbemitter';

const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
//Heroku
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

class ShipStore {
    constructor () {
        this.data = []
        this.crewData = []
        this.emitter = new EventEmitter()
    }

    async getShips() {
        try{
            const response = await fetch(`${SERVER}/ships`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_SHIPS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_SHIPS_ERROR')
        }
    }

    async addShip(ship) {
        try{
            const response = await fetch(`${SERVER}/ships`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(ship)
            })
            if(!response.ok){
                throw response
            }
            this.getShips()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_SHIP_ERROR')
        }
    }

    async saveShip(id,ship) {
        try{
            const response = await fetch(`${SERVER}/ships/${id}`,{
                method:'PUT',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(ship)
            })
            if(!response.ok){
                throw response
            }
            this.getShips()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_SHIP_ERROR')
        }
    }

    async deleteShip(id) {
        try{
            const response = await fetch(`${SERVER}/ships/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getShips()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_SHIP_ERROR')
        }
    }

    async filterShip(displacement, initial) {
        try{
            const response = await fetch(`${SERVER}/shipsFilter/${displacement}/${initial}`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_SHIPS_FILTER_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_SHIPS_FILTER_ERROR')
        }
    }

    async getSortedShips() {
        try{
            const response = await fetch(`${SERVER}/shipsSorted`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_SHIPS_SORTED_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_SHIPS_SORTED_ERROR')
        }
    }

    async getCrewMembers(shipId) {
        try{
            const response = await fetch(`${SERVER}/ships/${shipId}/crew`)
            if(!response.ok){
                throw response
            }
            this.crewData=await response.json()
            this.emitter.emit('GET_CREW_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_CREW_ERROR')
        }
    }

    async deleteCrewMember(id, shipId) {
        try{
            const response = await fetch(`${SERVER}/crew/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getCrewMembers(shipId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_CREW_ERROR')
        }
    }
}


const store = new ShipStore();

export default store;
