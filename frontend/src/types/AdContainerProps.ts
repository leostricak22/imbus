import {NavigationProp} from "@react-navigation/core";

type AdContainerProps = {
    navigation: NavigationProp<any>;
    ad: AdForm;
    refreshing: boolean;
}

export default AdContainerProps;