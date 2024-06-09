interface Message {
    id: number;
    message: string;
    receiverName: string;
    date: Date;
    senderName: string;
    status: any;
    opened: boolean;
}

export default Message;