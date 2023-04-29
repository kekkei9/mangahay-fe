import authOptions from "@/lib/nextAuthOptions";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
const AdminPage = () => {
  return <div>admin</div>;
};

export default AdminPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
          "http://localhost:3000/admin"
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
