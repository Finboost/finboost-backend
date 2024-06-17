import { findUserByEmail } from "../repository/users.repository.js";

const GENERATIVE_AI_SERVICE_URL = process.env.GENERATIVE_AI_SERVICE_URL || "";
const SUGGESTION_AI_SERVICE_URL = process.env.SUGGESTION_AI_SERVICE_URL || "";

export const getGenerativeAi = async (data) => {
    const response = await fetch(GENERATIVE_AI_SERVICE_URL , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
        }),
    });

    const res = await response.json();

    return res;
}

export const getSugesstionQuestion = async (data, emailUser) => {

    const userData = await findUserByEmail(emailUser);

    const profileData = userData?.profile ? {
        incomePerMonth: userData.profile.incomePerMonth,
        investments: userData.profile.investment,
        totalSavings: userData.profile.totalSaving,
        totalDebts: userData.profile.totalDebt,
        insurances: userData.profile.insurance,
    } : {};

    const response = await fetch(SUGGESTION_AI_SERVICE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
            total_questions: parseInt(data.total_questions),
            ...profileData,
        }),
    });

    const res = await response.json();

    return res;
}
