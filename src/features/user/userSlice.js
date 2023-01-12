import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { clear } from '@testing-library/user-event/dist/clear'
import { toast } from 'react-toastify'
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localstorage'
import { registerUserThunk, loginUserThunk, updateUserThunk, clearStoreThunk} from './userThunk'


const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    isSidebarOpen: false
}

export const registerUser = createAsyncThunk(
    'user/register',
    async (user, thunkAPI) =>{
        return registerUserThunk('auth/register', user, thunkAPI)
})

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        return loginUserThunk('/auth/login', user, thunkAPI)
    }
)

export const updateUser = createAsyncThunk(
    'user/updateuser',
    async(user, thunkAPI) => {
        return updateUserThunk('/auth/updateuser', user, thunkAPI )
    }
)

export const clearStore = createAsyncThunk('user/clearStore',clearStoreThunk)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser: (state, {payload}) => {
            state.user = null
            state.isSidebarOpen = false
            removeUserFromLocalStorage()
            if(payload) {
                toast.success(payload)
            }
        }
    },
    extraReducers:{
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Hello There ${user.name}`)
        },
        [registerUser.rejected]: (state, payload) => {
            state.isLoading = false
            toast.error(payload.payload)
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Welcome Back ${user.name}`)
        },
        [loginUser.rejected]: (state, payload) => {
            state.isLoading = false
            toast.error(payload.payload)
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, {payload}) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`User Updated ${user.name}`)
        },
        [updateUser.rejected]: (state, payload) => {
            state.isLoading = false
            toast.error(payload.payload)
        },
        [clearStore.rejected] : () => {
            toast.error('Tehere was an error...')
        }
    }
})

export const { toggleSidebar, logoutUser } = userSlice.actions
export default userSlice.reducer
