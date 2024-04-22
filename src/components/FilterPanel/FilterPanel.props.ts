import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FilterT } from '../../types';

export interface FilterPanelProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  filter: FilterT;
  setFilter: (value: FilterT) => void;
}
