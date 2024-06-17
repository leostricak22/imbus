export type FormParameter = {
    form: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        location?: string;
        category?: string[];
    };
    setForm: any;
};