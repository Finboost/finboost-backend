import bcrypt from "bcrypt";
import { SignUpUserSchema } from "../schema/auths.schema.js";
import { signUpUser } from "../service/auths.service.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import { ConflictError } from "../exceptions/client.exception.js";

export const signUpUserHandler = async (req, res) => {
    try {
        const validateData = SignUpUserSchema.parse(req.body);

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(validateData.password, salt);

        validateData.password = hashPassword;

        const newUserData = await signUpUser(validateData, res);

        res.status(201).send({
            status: "success",
            message: "User signup successfully",
            data: {
                id: newUserData.id,
            },
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            if (err instanceof ConflictError) {
                return;
            }
            handleServerError(err, res);
        }
    }
};
