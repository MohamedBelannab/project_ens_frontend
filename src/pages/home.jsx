import React, { useEffect } from 'react'
import { NavbarWithMegaMenu } from '../layout/Navbar'
import '../components/home/css/home.css'
import { Outlet } from 'react-router-dom'
import { Footer } from '../layout/Footer'
import { useSelector  , useDispatch} from "react-redux";
import { fetchStudents } from '../slices/studentSlice'
import { fetchFormations } from '../slices/formationSlice'
import { fetchDepartement } from '../slices/departementSlice'

const Home = () => {
  let loadingstatus = useSelector((state) => state.student.status);
  let statusForamation = useSelector((state) => state.formation.status);
  let statusDepartement = useSelector((state) => state.departement.status);
  let isLoged = useSelector(state=>state.login.isLoged)
  let departements = useSelector((state) => state.departement.departements);
    console.table(departements);
  const dispatch = useDispatch()
  useEffect(() => {
    if (loadingstatus == 'idle' ) {
      dispatch(fetchStudents())
    }

    if (statusForamation == 'idle') {
      dispatch(fetchFormations())
      
    }

    if (statusDepartement == 'idle') {
      dispatch(fetchDepartement())
      
    }
  } , [ loadingstatus , statusForamation  , statusDepartement ])

  return (
    
    <>
    <NavbarWithMegaMenu/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Home