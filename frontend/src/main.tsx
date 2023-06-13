import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import Musics from './pages/Musics/Musics.tsx'
import './styles/index.scss'
import App from './App.tsx'
import Login from './pages/Login/Login.tsx'
import Profile from './pages/Profile/Profile.tsx'
import CreateMusic from './pages/CreateMusic/CreateMusic.tsx'
import YourMusic from './pages/YourMusic/YourMusic.tsx'
import CreatePlaylist from './pages/CreatePlaylist/CreatePlaylist.tsx'
import YourPlaylist from './pages/YourPlaylist/YourPlaylist.tsx'

interface IPrivateRote {
  element: any,
}


const PrivateRoute: React.FC<IPrivateRote> = ({element: Element}) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  if(!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }

  return Element
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path:"/",
        element: <Musics/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path:"/music",
        element: <Musics/>
      },
      {
        path: "/playlists/local",
        element: <PrivateRoute element={<YourPlaylist/>}/>
      },
      {
        path: "/playlists/local/:playlistId",
        element: <PrivateRoute element={<div>hello world</div>}/>
      },
      {
        path:"/music/local",
        element: <PrivateRoute element={<YourMusic/>}/>
      },
      {
        path:"/create/music",
        element: <PrivateRoute element={<CreateMusic/>}/>
      },
      {
        path:"/create/playlist",
        element: <PrivateRoute element={<CreatePlaylist/>}/>
      },
      {
        path:"/profile",
        element: <PrivateRoute element={<Profile/>}/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
