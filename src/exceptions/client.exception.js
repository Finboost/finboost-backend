export const handleNotFoundError = (res, message = "Resource not found") => {
    res.status(404).send({
        status: "fail",
        message: message,
    });
};
