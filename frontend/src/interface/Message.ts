interface Message {
    id: number;
    message: string;
    receiverName: string;
    date: Date;
    senderName: string;
    status: any;
    opened: boolean;
    suggestion: boolean;
    suggestionStatus: string;
}

export default Message;