import {NavigationProp} from "@react-navigation/core";
import UserData from "@/src/interface/UserData"

export type ExpertContainerProps = {
    navigation: NavigationProp<any>;
    userData: UserData;
};

export default ExpertContainerProps;