import {boolean} from "zod";

export type AdSmallFixesDialogProps = {
    isVisible: boolean;
    onClose: () => void;
    onOption1Press: () => void;
    onOption2Press: () => void;
}

export default AdSmallFixesDialogProps;