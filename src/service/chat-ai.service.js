const GENERATIVE_AI_SERVICE_URL = process.env.GENERATIVE_AI_SERVICE_URL || "";
const SUGGESTION_AI_SERVICE_URL = process.env.SUGGESTION_AI_SERVICE_URL || "";

export const getGenerativeAi = async ({question}) => {
    const response = await fetch(GENERATIVE_AI_SERVICE_URL , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question,
        }),
    });

    const data = await response.json();

    return data;
}

export const getSugesstionQuestion = async ({user_input, total_questions}) => {
    const response = await fetch(SUGGESTION_AI_SERVICE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_input,
            total_questions,
        }),
    });

    const data = await response.json();

    return data;
}
