import {NavigationProp} from "@react-navigation/core";
import UserData from "@/src/interface/UserData";
import Message from "@/src/interface/Message";

export type ChatProps = {
    navigation: NavigationProp<any>;
    userData: UserData;
    route: any;
    messages: Message[];
    refetchMessages: any;
}

export default ChatProps;