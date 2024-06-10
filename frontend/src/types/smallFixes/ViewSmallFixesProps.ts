import {NavigationProp} from "@react-navigation/core";

export type ViewSmallFixesProps = {
    navigation: NavigationProp<any>;
    smallFixesForm: SmallFixesForm;
    images: string[];
    role?: string;
};

export default ViewSmallFixesProps;