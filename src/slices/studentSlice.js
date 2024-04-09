import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/api';
import { toast } from "react-toastify";



export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await api.get('/students/allStudents', {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    
    return response.data;  
});

export const addStudent = createAsyncThunk('/storeStudent', async (studentData) => {
    try {
        const response = await api.post('/storeStudent', studentData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const EditStudent = createAsyncThunk('/updateStudent', async ( studentData) => {
    try {
        const response = await api.put(`/updateStudent/${studentData.id}`, studentData.data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const DeleteStudent = createAsyncThunk('/delete', async ( studentData) => {
    try {
        const response = await api.delete(`/delete/${studentData.nameData}/${studentData.id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        status: 'idle',
        loading : false ,
        students: [],
        error: null
    },

    extraReducers(builder) {
        builder
            .addCase(fetchStudents.pending, (state, action) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = 'success';
                state.loading = false
                state.students = action.payload.students; 
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.loading = true
            })
            .addCase(addStudent.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`Étudiant créé !`)
            })    
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(EditStudent.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(EditStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`L'étudiant a été modifié!`)
            })    
            .addCase(EditStudent.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(DeleteStudent.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(DeleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`L'étudiant a été supprimer!`)
            })    
            .addCase(DeleteStudent.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default studentSlice.reducer;
