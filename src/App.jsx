import  Signup from './components/signup'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Login from './components/Login'
import { createBrowserRouter,RouterProvider } from 'react-router-dom' 
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
const browserRouter=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      },
      {
        path:"/account/edit",
        element:<EditProfile/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
])
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
