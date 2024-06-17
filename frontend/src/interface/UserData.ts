export default interface UserData {
    attachment: string;
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    role: string;
    location: string;
    categories: string[];
    profileImage: string;
    premium?: boolean;
}