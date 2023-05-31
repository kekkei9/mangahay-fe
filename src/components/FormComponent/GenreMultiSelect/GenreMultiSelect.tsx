import { ComicQueries } from "@/containers/FindComicPage/comicQueriesMapper";
import { MultiSelect } from "primereact/multiselect";
import { ControllerRenderProps } from "react-hook-form";

interface IGenreMultiSelectProps {
  field: ControllerRenderProps<ComicQueries, "filterGenre">;
  options?: { name: string; code: string }[];
  placeholder: string;
}

const GenreMultiSelect = ({
  field: { name, onChange, value },
  options,
  placeholder,
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
      placeholder={placeholder}
      className="w-full md:w-20rem"
    />
  );
};

export default GenreMultiSelect;
