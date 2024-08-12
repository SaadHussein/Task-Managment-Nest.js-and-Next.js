export interface RegisterResponseData {
	status: string;
	user: {
		name: string;
		email: string;
		linkedInProfileURL: string;
		image: string;
		tasks: TaskSchema[];
	};
	token: string;
}

export interface LoginResponseData {
	status: string;
	user: {
		name: string;
		email: string;
		linkedInProfileURL: string;
		image: string;
		tasks: TaskSchema[];
	};
	token: string;
}

export interface TaskSchema {
	title: string;
	description: string;
	category: string;
	completed: boolean;
	deadline: string;
	_id: string;
	userID: string;
}
