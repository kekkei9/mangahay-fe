import { ComicQueries } from "@/containers/FindComicPage/comicQueriesMapper";
import { MultiSelect } from "primereact/multiselect";
import { ControllerRenderProps } from "react-hook-form";

interface IGenreMultiSelectProps
  extends ControllerRenderProps<ComicQueries, "filterGenre"> {
  options?: { name: string; code: string }[];
}

const GenreMultiSelect = ({
  name,
  onChange,
  value,
  options,
}: IGenreMultiSelectProps) => {
  return (
    <MultiSelect
      id={name}
      name={name}
      value={value}
      optionLabel="name"
      options={options}
      onChange={(e) => {
        onChange(e.value);
      }}
      placeholder="Select Cities"
      className="w-full md:w-20rem"
    />
  );
};

export default GenreMultiSelect;
