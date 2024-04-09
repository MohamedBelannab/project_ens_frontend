import React, { useEffect } from 'react'
import { NavbarWithMegaMenu } from '../layout/Navbar'
import '../components/home/css/home.css'
import { Outlet } from 'react-router-dom'
import { Footer } from '../layout/Footer'
import { useSelector  , useDispatch} from "react-redux";
import { fetchStudents } from '../slices/studentSlice'
import { fetchFormations } from '../slices/formationSlice'

const Home = () => {
  let status = useSelector((state) => state.student.status);
  let statusFormation = useSelector((state) => state.formation.status);
    let students = useSelector((state) => state.student.students);
    let isLoged = useSelector(state=>state.login.isLoged)
    const dispatch = useDispatch()
  useEffect(() => {
    if (status === 'idle' && isLoged) {
      dispatch(fetchStudents())
    }

    if (statusFormation) {
      dispatch(fetchFormations())
      
    }
  } , [])

  return (
    
    <>
    <NavbarWithMegaMenu/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Home