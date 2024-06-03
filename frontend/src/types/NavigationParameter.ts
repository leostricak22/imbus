import {NavigationProp} from "@react-navigation/core";
import {type} from "node:os";

export type NavigationParameter = {
    navigation: NavigationProp<any>;
    route: any;
};