function Player (props) {

    return (
        <div id={props.id} className='player'>
            <p className='name'>{props.name}</p>
            <div className='victoryPointIcon'></div>
            <p className='points'>{props.points}</p>
        </div>
    )
}

export default Player;
