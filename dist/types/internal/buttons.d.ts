/** @jsx jsx */
/// <reference types="react" />
import { ThemeModes } from '@atlaskit/theme/types';
interface ButtonsProp {
    mode: ThemeModes;
    confirmButtonLabel: string;
    cancelButtonLabel: string;
    onMouseDown: () => void;
    onCancelClick: (event: React.MouseEvent<HTMLElement>) => void;
}
declare const Buttons: ({ mode, confirmButtonLabel, cancelButtonLabel, onMouseDown, onCancelClick, }: ButtonsProp) => JSX.Element;
export default Buttons;
