import jwt from "jsonwebtoken";

export const generateJwtToken = (payload, secret, expire) => {
    const token = jwt.sign(payload, secret, expire);

    return token;
};
