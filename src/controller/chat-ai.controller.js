import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import { GenerativeAiInput, SugesstionQuestionInput } from "../schema/chat-ai.schema.js";
import { getGenerativeAi, getSugesstionQuestion } from "../service/chat-ai.service.js";

export const getGenerativeAiHandler = async (req, res) => {
    try {
        const validateData = GenerativeAiInput.parse(req.body);

        const data = await getGenerativeAi(validateData);

        res.status(200).send({
            status: "success",
            message: "Successfully get generative AI",
            data,
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            handleServerError(err, res);
        }
    }
};

export const getSugesstionQuestionHandler = async (req, res) => {
    try {
        const validateData = SugesstionQuestionInput.parse(req.body);

        const data = await getSugesstionQuestion(validateData, req.email);

        res.status(200).send({
            status: "success",
            message: "Successfully get sugesstion question",
            data,
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            handleServerError(err, res);
        }
    }
}