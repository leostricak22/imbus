import {NavigationProp} from "@react-navigation/core";
import Expert from "@/src/interface/Expert";

export type ExpertContainerProps = {
    navigation: NavigationProp<any>;
    expert: Expert;
    role?: string;
    averageRating?: number;
    container?: boolean;
    ad?: boolean;
};

export default ExpertContainerProps;