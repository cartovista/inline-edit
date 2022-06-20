/** @jsx jsx */
import React from 'react';
interface ReadViewProps {
    editButtonLabel: string;
    onEditRequested: () => void;
    postReadViewClick: () => void;
    editButtonRef: React.RefObject<HTMLButtonElement>;
    readViewFitContainerWidth?: boolean;
    readView: () => React.ReactNode;
}
declare const ReadView: ({ editButtonLabel, onEditRequested, postReadViewClick, editButtonRef, readViewFitContainerWidth, readView, }: ReadViewProps) => JSX.Element;
export default ReadView;
