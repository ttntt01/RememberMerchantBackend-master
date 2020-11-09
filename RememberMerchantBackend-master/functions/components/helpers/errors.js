module.exports = class AppError extends Error {
    constructor(message, status, customFields = {}, errorName) {
        // Calling parent constructor of base Error class.
        super();

        // Saving class name in the property of our custom error as a shortcut.
        this.error = errorName || 'AppError';

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `400` is the default value if not specified.
        this.status = 400;
        if (status > 599) {
            this.errorCode = status;
        } else {
            this.status = status;
        }

        this.message = message || "";

        if (!!customFields) {
            Object.keys(customFields).map(key => {
                this[key] = customFields[key];
            });
        }
    }
}
