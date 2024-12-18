import { Suspense, lazy , useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Loading from './components/skeleton/loading';
import ProtectedRoutes from './protectedRoute/protectedRoutes';
import Logout from './auth/logout';
import Index from './components/home/pages';
import { setIsloged  , setUser} from './slices/loginSlice';
import api from './api/api';
import AdmindRoutes from './protectedRoute/adminRoutes';
const Home  = lazy(()=> import('./pages/home'))
const Student = lazy(()=> import('./components/home/pages/student'))
//Admin
const Dashboard = lazy(()=>import('./admin/dashboard'))
const HomeAdmin = lazy(()=> import('./admin/pages/home'))
const StudentAdmin = lazy(()=> import('./admin/pages/students'))
const IndexStudent = lazy(()=> import('./admin/components/data-tabele/StudentDataTable'))
const FormationAdmin = lazy(()=> import('./admin/pages/formation'))
const IndexFormation = lazy(()=> import('./admin/components/data-tabele/formationDataTable'))
const DepartementAdmin = lazy(()=> import('./admin/pages/departement'))
const IndexDepartement = lazy(()=> import('./admin/components/data-tabele/departementDataTable'))

function App() {
  let isLoged = useSelector(state=>state.login.isLoged)
  let dispatch = useDispatch()
  let userOfToken = async () => {
    await api.get('/user', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then((response) => {
      dispatch(setUser(response.data.user))
    }).catch((error) => {
      console.log("eroor" , error);
      if (error) {
        localStorage.removeItem('token')
        dispatch(setIsloged())
      }
      
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
        </Route>
        {/* this routes is for the admins*/}
        <Route element={<AdmindRoutes/>}>
          <Route path="/dashboard" element={
            <Suspense fallback={<Loading/>}>
            <Dashboard />
          </Suspense>
          } >
          <Route index element={<HomeAdmin/>}/>

          <Route path='étudiantes' element={
          <Suspense fallback={<Loading/>}>
            <StudentAdmin />
          </Suspense>
          }>
            <Route index element={
            <Suspense fallback={<Loading/>}>
              <IndexStudent />
            </Suspense>
            }/>
          </Route>
          <Route path='formations' element={
          <Suspense fallback={<Loading/>}>
            <FormationAdmin />
          </Suspense>
          }>
            <Route index element={
            <Suspense fallback={<Loading/>}>
              <IndexFormation />
            </Suspense>
            }/>
          </Route>
          <Route path='departements' element={
          <Suspense fallback={<Loading/>}>
            <DepartementAdmin />
          </Suspense>
          }>
            <Route index element={
            <Suspense fallback={<Loading/>}>
              <IndexDepartement />
            </Suspense>
            }/>
          </Route>
          
          
        </Route>
        

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
