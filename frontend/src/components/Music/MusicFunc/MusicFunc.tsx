import { useDleteYourTrackMutation } from '../../../store/api/music/music.api'

const MusicFunc = ({id,handleDelete}: any) => {
  return (
    <div>
        <button onClick={handleDelete}>
            delete
        </button>
    </div>
  )
}

export default MusicFunc