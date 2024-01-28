class Helper {
    sendResponse = function (res, statusCode, data) {
        return res.status(statusCode).json({ result: data });
    }
}

export default new Helper();