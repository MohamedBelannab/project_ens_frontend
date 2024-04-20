import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/api';
import { toast } from "react-toastify";



export const fetchDepartement = createAsyncThunk('departements/fetchDepartement', async () => {
    const response = await api.get('/departements/allDepartements');
    
    return response.data;  
});

export const addDepartement = createAsyncThunk('/storeDepartement', async (formationData) => {
    try {
        const response = await api.post('/storeDepartement', formationData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const EditDepartement = createAsyncThunk('/updateDepartementcd ', async ( formationData) => {
    try {
        const response = await api.put(`/updateFiliere/${formationData.id}`, formationData.data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data);
    }
});

export const DeleteDepartement = createAsyncThunk('/deleteDepartement', async ( data) => {
    try {
        const response = await api.delete(`/delete/${data.nameData}/${data.id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

const departementSlice = createSlice({
    name: 'departement',
    initialState: {
        status: 'idle',
        loading : false ,
        departements: [],
        error: null
    },
    reducers: {
        setDepartementStatus : (state , action) => {
            state.status = action.payload
        }
    } ,
    extraReducers(builder) {
        builder
            .addCase(fetchDepartement.pending, (state, action) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(fetchDepartement.fulfilled, (state, action) => {
                state.status = 'success';
                state.loading = false
                state.departements = action.payload.departements; 
            })
            .addCase(fetchDepartement.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.loading = true
            })
            .addCase(addDepartement.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(addDepartement.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`Departement créé !`)
            })    
            .addCase(addDepartement.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = "Le Nom departement existe déjà";
                toast.error(state.error)
            })
            .addCase(EditDepartement.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(EditDepartement.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`Departement a été modifié!`)
            })    
            .addCase(EditDepartement.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(DeleteDepartement.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(DeleteDepartement.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`Departement a été supprimer!`)
            })    
            .addCase(DeleteDepartement.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});
export const { setDepartementStatus} = departementSlice.actions
export default departementSlice.reducer;
