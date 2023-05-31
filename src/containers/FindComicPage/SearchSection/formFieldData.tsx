import { PrimeIcons } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { MultiStateCheckboxOption } from "primereact/multistatecheckbox";
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from "react-hook-form";
import { ComicQueries } from "../comicQueriesMapper";
import MultiStateCheckboxComponent from "@/components/FormComponent/MultiStateCheckbox";
import GenreMultiSelectContainer from "./GenreMultiSelect";

export const multiStateOptions: MultiStateCheckboxOption[] = [
  {
    value: "Chưa lên kệ",
    icon: PrimeIcons.CALENDAR_MINUS,
    style: {},
    className: "",
  },
  {
    value: "Đang tiến hành",
    icon: PrimeIcons.CALENDAR,
    style: {},
    className: "",
  },
  {
    value: "Đã hoàn thành",
    icon: PrimeIcons.CHECK_SQUARE,
    style: {},
    className: "",
  },
];

export const formFields: {
  label: string;
  name:
    | "comicName"
    | "filterState"
    | "filterAuthor"
    | "filterGenre"
    | "filterSort";
  render: (props: {
    field: ControllerRenderProps<ComicQueries, any>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<ComicQueries>;
  }) => React.ReactElement;
}[] = [
  {
    label: "Tên truyện",
    name: "comicName",
    render: ({ field }) => <InputText {...field} placeholder="Tìm truyện" />,
  },
  {
    label: "Tên tác giả",
    name: "filterAuthor",
    render: ({ field }) => <InputText {...field} placeholder="Tìm tác giả" />,
  },
  {
    label: "Thể loại",
    name: "filterGenre",
    render: ({ field }) => <GenreMultiSelectContainer field={field} />,
  },
  {
    label: "Trạng thái",
    name: "filterState",
    render: ({ field }) => (
      <MultiStateCheckboxComponent field={field} options={multiStateOptions} />
    ),
  },
];
