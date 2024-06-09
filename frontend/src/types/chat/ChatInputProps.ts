import Message from "@/src/interface/Message";

export type ChatInputProps = {
    message: string;
    setMessage: any;
    submit: any;
    role: string;
    otherUser: string;
    calendarTrigger: boolean;
    setCalendarTrigger: any;
}