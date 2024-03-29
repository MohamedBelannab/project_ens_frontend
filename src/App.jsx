import { Suspense, lazy, useState , useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Loading from './components/skeleton/loading';
import ProtectedRoutes from './protectedRoute/protectedRoutes';
import Logout from './auth/logout';
import Index from './components/home/pages';
import { setIsloged  , setUser} from './slices/loginSlice';
const Home  = lazy(()=> import('./pages/home'))
const Student = lazy(()=> import('./components/home/pages/student'))
function App() {
  let isLoged = useSelector(state=>state.login.isLoged)
  let dispatch = useDispatch()
  let userOfToken = async ()=>{
    await axios.get('/login',{
      withCredentials: true,
      headers: {
       
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`


      }}).then((res)=>{
        dispatch(setUser(res.data))
      }).catch((err)=>{
        localStorage.removeItem('token')
        dispatch(setIsloged())
      })
  }
  useEffect(()=>{
    if(isLoged){
      userOfToken()
    }
  },[isLoged])

  return (
    <BrowserRouter>
      <Routes>
        {/* this routes the user  need to be authenticated */}
        <Route element={<ProtectedRoutes/>}>
        <Route path="/logout" element={<Logout />} />
        {/* this routes is for the admins*/}

        </Route>
        <Route path='/' element={
          <Suspense fallback={<Loading/>}>
            <Home />
          </Suspense>
        }>
          <Route index element={<Index/>}/>
          <Route path='/étudiantes' element={
          <Suspense fallback={<Loading/>}>
            <Student />
          </Suspense>
          }/>


        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
