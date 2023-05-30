import { ControllerRenderProps } from "react-hook-form";
import { ComicQueries } from "../../comicQueriesMapper";
import GenreMultiSelectComponent from "@/components/DynamicForm/DynamicFormComponent/GenreMultiSelect";
import useSWRImmutable from "swr/immutable";
import { Response } from "@/types/Response.type";
import { Genre } from "@/types/Comic";

const GenreMultiSelect = ({
  field,
}: {
  field: ControllerRenderProps<ComicQueries, "filterGenre">;
}) => {
  const { data: genresResponse } =
    useSWRImmutable<Response<Genre[]>>("/api/comic/genres");

  return (
    <GenreMultiSelectComponent
      {...field}
      options={genresResponse?.result?.map(({ genre, slug }) => ({
        code: slug,
        name: genre,
      }))}
    />
  );
};

export default GenreMultiSelect;
