
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedCode } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const codeGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        html: {
            type: Type.STRING,
            description: "The complete HTML code for the page body. It should be self-contained within a single file and not require external HTML files. All necessary elements should be included.",
        },
        css: {
            type: Type.STRING,
            description: "The complete CSS code. It should style the HTML elements and be self-contained. Do not use external CSS frameworks unless specifically asked.",
        },
        js: {
            type: Type.STRING,
            description: "The complete JavaScript code for interactivity. It should be vanilla JavaScript and self-contained. Do not use external libraries unless specifically asked.",
        },
    },
    required: ["html", "css", "js"],
};


export const generateCode = async (prompt: string): Promise<GeneratedCode> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: "You are an expert web developer. Based on the user's prompt, generate the complete HTML, CSS, and JavaScript code for a single-page web application. Ensure the CSS is self-contained and does not require external libraries. The JavaScript should be vanilla and also self-contained. Provide the code in a JSON object with three keys: 'html', 'css', and 'js'.",
                responseMimeType: "application/json",
                responseSchema: codeGenerationSchema,
            },
        });

        const jsonString = response.text.trim();
        const generatedCode = JSON.parse(jsonString);
        
        return {
            html: generatedCode.html || '',
            css: generatedCode.css || '',
            js: generatedCode.js || '',
        };

    } catch (error) {
        console.error("Error generating code:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate code from AI: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating code.");
    }
};
