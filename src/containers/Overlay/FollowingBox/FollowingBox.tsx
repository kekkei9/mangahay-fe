import FollowingComponent from "@/components/Overlay/Following";
import { ListBox } from "primereact/listbox";
import useSWR from "swr";

const FollowingBox = () => {
  //   const { data: followingResponse } = useSWR("/api/user/comic/following");

  //TODO: Fix to API
  const followingMangas: any[] = [];

  return (
    <div className="following-box">
      <ListBox
        options={followingMangas}
        optionLabel="name"
        itemTemplate={(following) => <FollowingComponent />}
        className="w-full md:w-14rem"
        listStyle={{ maxHeight: "250px" }}
      />
    </div>
  );
};

export default FollowingBox;
