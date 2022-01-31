

function CrewDetails(props) {

    const { item, onDeleteCrewMember } = props;

    const deleteCrew = () => {
        onDeleteCrewMember(item.id, item.shipId)
    }

    const editCrew = () => {

    }

    return (
        <div>
            <div>
                My Name is <a className="movie-title">{item.name}</a>  and I work as a <span className="movie-category">{item.role} </span>
            </div>
            <div>
                <input type='button' value='delete' onClick={deleteCrew} />
                <input type='button' value='edit' onClick={editCrew} />
            </div>
        </div>
    );
}

export default CrewDetails;