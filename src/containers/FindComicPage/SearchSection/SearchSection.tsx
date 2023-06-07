import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";
import { ComicQueries, initialComicQueries } from "../comicQueriesMapper";
import { formFields } from "./formFieldData";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ISearchSectionProps {
  onSubmit: (formData: ComicQueries) => void;
  defaultValues?: Object;
}

const SearchSection = ({ onSubmit, defaultValues }: ISearchSectionProps) => {
  const router = useRouter();
  const { handleSubmit, reset, control, setValue, getValues } = useForm({
    defaultValues: { ...initialComicQueries, ...router.query },
  });

  useEffect(() => {
    onSubmit(getValues());
  }, []);

  return (
    <form className="search-section" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-2 items-center">
        {formFields.map(({ label, name, render }) => (
          <>
            <span className="col-span-1 font-semibold">{label}</span>
            <div className="col-span-3 sm:col-span-2 lg:col-span-3">
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
