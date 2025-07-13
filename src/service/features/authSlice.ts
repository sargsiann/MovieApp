// Creating slice
import { createSlice} from "@reduxjs/toolkit";

// Types 
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";

interface Message {
	id : string;
	text: string;
	createdAt: Date;
	fileUrl?: string; // Optional field for file URL
	authorId: string; // ID of the user who sent the message
	authorName: string; // Name of the user who sent the message
	authorAvatar?: string; // Optional field for author's avatar URL
	chatId: string; // ID of the chat where the message was sent
}

interface Chat {
	id: string;
	messages: Message[]; // Array of messages in the chat
	createdAt: Date; // Timestamp of when the chat was created
	participants: string[]; // Array of user IDs participating in the chat
	participantsNames: string[]; // Array of names of participants in the chat
	participantsAvatars?: string[]; // Optional array of avatars of participants
}

// Define the shape of the authentication state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  categories?: string[]; // Optional categories field
  chats ?: Chat[]; // Optional chats field
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
