import React, { useEffect } from 'react'
import { useGetInfoQuery } from '../../store/api/user/user.api'
import { useGetYourMusicMutation } from '../../store/api/music/music.api'

const Profile = () => {
    const {isSuccess,data} = useGetInfoQuery("")
    const [req, yourMusic] = useGetYourMusicMutation()

    useEffect(() => {
        console.log(data)
    },[isSuccess,data])


    const handleYourMusic = () => {
        req("")
        console.log(yourMusic.data)
    }
  return (
    <div>
        <div style={{color:"white",fontSize:"56px",textAlign:"center"}}>
            Profile
        </div>
        <button onClick={handleYourMusic}>
            test
        </button>
    </div>
  )
}

export default Profile