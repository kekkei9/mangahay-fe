import NavBar from "@/containers/NavBar";

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="mt-10">{children}</main>
    </>
  );
};

export default MainLayout;
