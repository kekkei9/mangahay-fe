import SearchBoxContainer from "@/containers/Overlay/SearchBox";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { ChangeEvent, useRef, useState } from "react";

const SearchPanel = () => {
  const searchOverlayRef = useRef<OverlayPanel>(null);

  const [searchText, setSearchText] = useState<string>("");

  const handleOnSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      searchOverlayRef.current?.show(e, null);
    } else {
      searchOverlayRef.current?.hide();
    }
  };

  return (
    <>
      <OverlayPanel ref={searchOverlayRef}>
        <SearchBoxContainer value={searchText} />
      </OverlayPanel>

      <span className="search-bar p-input-icon-left">
        <i className="pi pi-search" />
        <InputText placeholder="Tìm truyện" onChange={handleOnSearchChange} />
      </span>
    </>
  );
};

export default SearchPanel;
