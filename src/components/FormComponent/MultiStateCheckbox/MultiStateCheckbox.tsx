import { ComicQueries } from "@/containers/FindComicPage/comicQueriesMapper";
import { ControllerRenderProps } from "react-hook-form";
import {
  MultiStateCheckbox as MultiState,
  MultiStateCheckboxOption,
} from "primereact/multistatecheckbox";
import styles from "./MultiStateCheckbox.module.scss";

interface IMultiStateCheckboxProps {
  field: ControllerRenderProps<ComicQueries, "filterState">;
  options: MultiStateCheckboxOption[];
  empty?: boolean;
  labelMapper?: {
    [key: string]: string;
  };
}

const MultiStateCheckbox = ({
  field: { name, value, onChange, ref },
  options,
  empty = true,
  labelMapper,
}: IMultiStateCheckboxProps) => {
  return (
    <div
      className={`${styles["multi-state-checkbox"]} flex items-center gap-2`}
    >
      <MultiState
        id={name}
        value={value}
        onChange={onChange}
        ref={ref}
        options={options}
        optionValue="value"
        className="!w-10 !h-10"
        empty={empty}
      />
      <div className="text-lg">
        {labelMapper?.[value as keyof typeof labelMapper] || value}
      </div>
    </div>
  );
};

export default MultiStateCheckbox;
