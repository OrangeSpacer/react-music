export class ApiError extends Error {
	public status: number;
	public errors: any;

	constructor(status: number, message: any, errors: any = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnathorizedError() {
		return new ApiError(401, "Пользователь не авторизован");
	}

	static badRequset(message: any, errors: any = []) {
		return new ApiError(400, message, errors);
	}
}
