interface Message {
    id: number;
    message: string;
    receiverName: string;
    date: Date;
    senderName: string;
    status: any;
}

export default Message;