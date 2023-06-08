import Layout from "@/layouts/Layout";
import { RootState } from "@/redux";
import { Account } from "@/types/Auth";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const infoFields = [
  {
    label: "Email",
    dataIndex: "email",
  },
  {
    label: "Ngày tạo",
    dataIndex: "createdAt",
    isDate: true,
  },
  {
    label: "Ngày chỉnh sửa cuối",
    dataIndex: "updatedAt",
    isDate: true,
  },
];

const AccountPage = () => {
  const { user } = useSelector((state: RootState) => state.authentication);

  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  return (
    <Layout className="account-page max-w-4xl w-fit">
      <div className="bg-white rounded-3xl p-10 flex flex-col gap-2 items-center">
        {user.avatar && isClient && (
          <div className="relative w-32 aspect-square">
            <Image
              src={user.avatar}
              alt={`${user.fullname} 's avatar`}
              fill
              className="object-contain rounded-full"
            />
          </div>
        )}
        <div className="text-xl font-semibold mt-2">{user.fullname}</div>
        <div className="flex flex-col gap-2">
          {infoFields.map(({ label, dataIndex, isDate }) => (
            <div key={dataIndex}>
              <div className="ml-1 font-semibold">{label}</div>
              <div className="mt-1">
                {isDate
                  ? formatDate(user?.[dataIndex as keyof Account] as string)
                  : user?.[dataIndex as keyof Account]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
