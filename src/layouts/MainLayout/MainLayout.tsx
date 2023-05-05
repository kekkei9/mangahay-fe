interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div className="header fixed left-0 top-0 h-10 z-50">
        hi this is header
      </div>
      <main className="mt-10">{children}</main>
    </>
  );
};

export default MainLayout;
