import {NavigationProp} from "@react-navigation/core";

type AdContainerProps = {
    navigation: NavigationProp<any>;
    smallFixes: SmallFixesForm;
    refreshing: boolean;
    role?: string;
}

export default AdContainerProps;