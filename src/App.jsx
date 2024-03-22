import { Suspense, lazy, useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Loading from './components/skeleton/loading';
import ProtectedRoutes from './protectedRoute/protectedRoutes';
import Logout from './auth/logout';
import Index from './components/home/pages';
const Home  = lazy(()=> import('./pages/home'))
function App() {
  const [count, setCount] = useState(0)

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

        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
