
export function handlerWrapper() {
    return function (target, key, descriptor) {
        let className = "";
        let prototypeClassName = "";

        if (target.constructor.name === "Function") {
            prototypeClassName = target.prototype;
            className = prototypeClassName.constructor.name;
        } else {
            className = target.constructor.name;
        }

        const originalMethod = descriptor.value;

        descriptor.value = async function (req, res) {
            let start = process.hrtime();

            try {
                reqInfo.set(req);
                const result = await originalMethod.call(this, req, res);
                req.elapsed = Number(process.hrtime(start)[1] / 1000000).toFixed(3);         
                return result;
            } catch (err) {
                req.elapsed = Number(process.hrtime(start)[1] / 1000000).toFixed(3);
                let statusCode = err && err.status || constResStatus.BAD_REQUEST;
                let errorObj = err;

                if (isSystemError(err)) {
                    // handle internal server error
                    statusCode = constResStatus.INTERNAL_SERVER_ERROR;
                    errorObj = {
                        name: err && err.name || '',
                        message: err && err.message || '',
                    };
                }        
                return res.status(statusCode).json(errorObj);
            }
        };
        return descriptor;
    };
}

