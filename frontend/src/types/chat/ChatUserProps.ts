import Message from "@/src/interface/Message";
import {NavigationProp} from "@react-navigation/core";

type ChatUserProps = {
    navigation: NavigationProp<any>;
    chat: Message;
    username: string;
    role: string;
    messages: Message[];
    refetchMessages: any;
}

export default ChatUserProps;