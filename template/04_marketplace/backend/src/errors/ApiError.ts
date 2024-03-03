class ApiError {
    message?: string | any;
    constructor(message?: string | any) {
        this.message = message;
    }
}

export default ApiError;
