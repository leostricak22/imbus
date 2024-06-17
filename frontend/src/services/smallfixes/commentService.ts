import envVars from "@/src/utils/envVars";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchComments = async (smallFixesId: number) => {
    try {
        const response = await fetch(`${envVars.API_ENDPOINT}/api/comments/${smallFixesId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const comments = await response.json();
        return comments;

    } catch (error) {
        throw error;
    }
};


export const addComment = async (comment: string, smallFixesId: number) => {
    if (comment.trim() === "") {
        return;
    }

    const commentData = { description: comment, smallFixId: smallFixesId };

    try {
        const response = await fetch(`${envVars.API_ENDPOINT}/api/comments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
};
