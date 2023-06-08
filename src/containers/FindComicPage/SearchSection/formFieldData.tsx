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

export const sortbyOptions: MultiStateCheckboxOption[] = [
  {
    value: "az",
    icon: PrimeIcons.ARROW_DOWN,
    style: {},
    className: "",
  },
  {
    value: "za",
    icon: PrimeIcons.ARROW_UP,
    style: {},
    className: "",
  },
  {
    value: "updatedAt",
    icon: PrimeIcons.SYNC,
    style: {},
    className: "",
  },
  {
    value: "like",
    icon: PrimeIcons.THUMBS_UP,
    style: {},
    className: "",
  },
  {
    value: "view",
    icon: PrimeIcons.EYE,
    style: {},
    className: "",
  },
];

export const sortbyLabelMapper = {
  az: "A->Z",
  za: "Z->A",
  updatedAt: "Mới cập nhật",
  like: "Được thích nhiều",
  view: "Được xem nhiều",
};

export const multiStateOptions: MultiStateCheckboxOption[] = [
  {
    value: "Đang tiến hành",
    icon: PrimeIcons.CALENDAR,
    style: {},
    className: "",
  },
  {
    value: "Tạm ngưng",
    icon: PrimeIcons.CALENDAR_TIMES,
    style: {},
    className: "",
  },
  {
    value: "Hoàn thành",
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
  {
    label: "Sắp xếp theo",
    name: "filterSort",
    render: ({ field }) => (
      <MultiStateCheckboxComponent
        field={field}
        options={sortbyOptions}
        empty={false}
        labelMapper={sortbyLabelMapper}
      />
    ),
  },
];
