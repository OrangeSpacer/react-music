import { useEffect } from "react"
import Main from "./pages/Main/Main"
import { useRefreshUserMutation } from "./store/api/user/user.api"
import { useNavigate } from "react-router-dom"

const App = () => {
  const [refreshToken,res] = useRefreshUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token")){
      refreshToken("")
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
