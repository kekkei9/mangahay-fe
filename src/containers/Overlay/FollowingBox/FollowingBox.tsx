import FollowingComponent from "@/components/Overlay/Following";
import { Following } from "@/types/Following";
import { Response } from "@/types/Response.type";
import { ListBox } from "primereact/listbox";
import useSWR from "swr";

const FollowingBox = () => {
  //TODO: Implement infinite & template & onClick
  const { data: followingResponse } = useSWR<Response<Following[]>>(
    "/api/user/comic/following?limit=100&page=0"
  );

  return (
    <div className="following-box">
      <ListBox
        options={followingResponse?.result}
        optionLabel="name"
        itemTemplate={(following) => <FollowingComponent />}
        className="w-full md:w-14rem"
        listStyle={{ maxHeight: "250px" }}
      />
    </div>
  );
};

export default FollowingBox;
