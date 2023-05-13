import { useEffect, useState } from "react"
import Main from "./pages/Main/Main"
import { useRefreshUserMutation } from "./store/api/user.api"
import { useNavigate } from "react-router-dom"

const App = () => {
  const [auth,res] = useRefreshUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token")){
      auth("")
    }
  },[])

  useEffect(() => {
    if(res.isError){
      navigate("/login")
    }
  },[res.isError,navigate])

  return (
    <div>
      <Main/>
    </div>
  )
}

export default App
