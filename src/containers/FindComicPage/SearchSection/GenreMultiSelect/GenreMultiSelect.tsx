import { ControllerRenderProps } from "react-hook-form";
import { ComicQueries } from "../../comicQueriesMapper";
import useSWRImmutable from "swr/immutable";
import { Response } from "@/types/Response.type";
import { Genre } from "@/types/Comic";
import GenreMultiSelectComponent from "@/components/FormComponent/GenreMultiSelect";

const GenreMultiSelect = ({
  field,
}: {
  field: ControllerRenderProps<ComicQueries, "filterGenre">;
}) => {
  const { data: genresResponse } =
    useSWRImmutable<Response<Genre[]>>("/api/comic/genres");

  return (
    <GenreMultiSelectComponent
      field={field}
      options={genresResponse?.result?.map(({ genre, slug }) => ({
        code: slug,
        name: genre,
      }))}
      placeholder="Chọn thể loại"
    />
  );
};

export default GenreMultiSelect;
