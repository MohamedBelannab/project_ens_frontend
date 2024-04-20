import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/api';
import { toast } from "react-toastify";



export const fetchFormations = createAsyncThunk('filiers/fetchFormations', async () => {
    const response = await api.get('/filiers/allFiliers');
    
    return response.data;  
});

export const addForamtion = createAsyncThunk('/storeFilier', async (formationData) => {
    try {
        const response = await api.post('/storeFilier', formationData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

export const EditFormation = createAsyncThunk('/updateFiliere', async ( formationData) => {
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

export const DeleteFormation = createAsyncThunk('/deleteFormation', async ( formationData) => {
    try {
        const response = await api.delete(`/delete/${formationData.nameData}/${formationData.id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        return response.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
});

const formationSlice = createSlice({
    name: 'formation',
    initialState: {
        status: 'idle',
        loading : false ,
        formations: [],
        error: null
    },
    reducers: {
        setFormationStatus : (state , action) => {
            state.status = action.payload
        }
    } ,

    extraReducers(builder) {
        builder
            .addCase(fetchFormations.pending, (state, action) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(fetchFormations.fulfilled, (state, action) => {
                state.status = 'success';
                state.loading = false
                state.formations = action.payload.filiers; 
            })
            .addCase(fetchFormations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.loading = true
            })
            .addCase(addForamtion.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(addForamtion.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`Formation créé !`)
            })    
            .addCase(addForamtion.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = "Le Nom formation existe déjà";
                toast.error(state.error)
            })
            .addCase(EditFormation.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(EditFormation.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`Formation a été modifié!`)
            })    
            .addCase(EditFormation.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(DeleteFormation.pending, (state, action) => {
                state.loading = true;
                state.status = 'pending';
            })
            .addCase(DeleteFormation.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                toast.success(`Formation a été supprimer!`)
            })    
            .addCase(DeleteFormation.rejected, (state, action) => {
                state.loading = true ;
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});
export const { setFormationStatus} = formationSlice.actions
export default formationSlice.reducer;
