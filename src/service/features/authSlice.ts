// Creating slice
import { createSlice} from "@reduxjs/toolkit";

// Types 
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";

// Define the shape of the authentication state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Main slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearError, logout } = authSlice.actions;
export default authSlice.reducer;
