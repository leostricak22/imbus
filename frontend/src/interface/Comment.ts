import UserData from "@/src/interface/UserData"

export default interface Comment {
    id: number;
    user: UserData;
    description: string;
    created_at: Date;
}