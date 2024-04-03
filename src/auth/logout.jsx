import api from '../api/api';
import { setUser , setIsloged } from '../slices/loginSlice';

const logout = async (dispatch, navigate) => {
  try {
    await api.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    localStorage.removeItem('token');
    dispatch(setIsloged());
    dispatch(setUser({}));
    navigate('/');
  } catch (error) {
    console.error("Logout error:", error);
    navigate('/');
  }
};

export default logout;
