import authOptions from "@/lib/nextAuthOptions";
import axiosClient from "@/services/backend/axiosClient";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
const AdminPage = () => {
  //for auth testing
  return <div>admin</div>;
};

export default AdminPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions(axiosClient));

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
          "http://localhost:8080/admin"
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
