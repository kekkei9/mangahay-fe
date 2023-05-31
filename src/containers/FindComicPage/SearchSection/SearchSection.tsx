import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";
import { ComicQueries, initialComicQueries } from "../comicQueriesMapper";
import { formFields } from "./formFieldData";

interface ISearchSectionProps {
  onSubmit: (formData: ComicQueries) => void;
}

const SearchSection = ({ onSubmit }: ISearchSectionProps) => {
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: initialComicQueries,
  });

  return (
    <form className="search-section" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-8 gap-x-4 gap-y-2 items-center">
        {formFields.map(({ label, name, render }) => (
          <>
            <span className="col-span-1 font-semibold">{label}</span>
            <div className="col-span-3">
              <Controller name={name} control={control} render={render} />
            </div>
          </>
        ))}
      </div>

      <div className="w-full flex justify-center gap-6 mt-6">
        <Button type="submit">Tìm kiếm</Button>
        <Button
          type="button"
          onClick={() => reset()}
          className="!opacity-60 hover:!opacity-100"
        >
          Đặt lại
        </Button>
      </div>
    </form>
  );
};

export default SearchSection;
