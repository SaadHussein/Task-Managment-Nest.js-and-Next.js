// redux/slices/counterSlice.ts

import { TaskSchema } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
	name: string;
	email: string;
	token: string;
	image: string;
	tasks: TaskSchema[];
}

const initialState: UserDataState = {
	name: "",
	email: "",
	token: "",
	image: "",
	tasks: [],
};

export const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload.value;
		},
		setEmail(state, action) {
			state.email = action.payload.value;
		},
		setToken(state, action) {
			state.token = action.payload.value;
		},
		setImage(state, action) {
			state.image = action.payload.value;
		},
		setTasks(state, action) {
			state.tasks = action.payload.value;
		},
		logout(state) {
			state.name = "";
			state.email = "";
			state.image = "";
			state.token = "";
			state.tasks = [];
		},
	},
});

export const { setEmail, setImage, setName, setToken, setTasks, logout } =
	userDataSlice.actions;

export default userDataSlice.reducer;
