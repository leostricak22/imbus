export interface Expert {
    id: number;
    name: string;
    surname: string;
    username: string;
    location: string;
    role: string;
    categories: string[];
    profileImage: string;
    ratings?: any;
    premium?: boolean;
}

export default Expert;