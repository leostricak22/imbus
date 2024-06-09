import {boolean} from "zod";

export type DialogProps = {
    isVisible: boolean;
    onClose: () => void;
    onOption1Press: () => void;
    onOption2Press: () => void;
    value?: any;
    setValue?: any;
}

export default DialogProps;