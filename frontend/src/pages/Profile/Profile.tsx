import React, { useEffect } from 'react'
import { useGetInfoQuery } from '../../store/api/user/user.api'

const Profile = () => {
    const {isSuccess,data} = useGetInfoQuery("")

    useEffect(() => {
        console.log(data)
    },[isSuccess,data])

  return (
    <div>
        <div style={{color:"white",fontSize:"56px",textAlign:"center"}}>
            Profile
        </div>
    </div>
  )
}

export default Profile