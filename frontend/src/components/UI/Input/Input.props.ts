export interface IInput {
	inputText?: string;
	placeholder?: string;
	required: boolean;
	type: "email" | "file" | "password" | "text";
	errors: string;
	register: any;
}
