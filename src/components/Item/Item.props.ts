import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ItemProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    id: string;
    body: string,
    checked: boolean
    }
