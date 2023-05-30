import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";
import { ComicQueries, initialComicQueries } from "../comicQueriesMapper";
import GenreMultiSelectContainer from "./GenreMultiSelect";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { multiStateData } from "./multiStateData";

interface ISearchSectionProps {
  onSubmit: (formData: ComicQueries) => void;
}

const SearchSection = ({ onSubmit }: ISearchSectionProps) => {
  const { handleSubmit, register, getValues, control } = useForm({
    defaultValues: initialComicQueries,
  });

  return (
    <form className="search-section" onSubmit={handleSubmit(onSubmit)}>
      <InputText placeholder="Tìm truyện" {...register("comicName")} />
      <InputText placeholder="Tìm tác giả" {...register("filterAuthor")} />

      <Controller
        name="filterGenre"
        control={control}
        render={({ field }) => <GenreMultiSelectContainer field={field} />}
      />

      <Controller
        name="filterState"
        control={control}
        render={({ field: { name, value, onChange, ref }, fieldState }) => (
          <div className="flex">
            <MultiStateCheckbox
              id={name}
              value={value}
              onChange={onChange}
              ref={ref}
              options={multiStateData}
              optionValue="value"
            />
            <div>{value}</div>
          </div>
        )}
      />

      <Button type="submit">Tìm kiếm</Button>
    </form>
  );
};

export default SearchSection;
