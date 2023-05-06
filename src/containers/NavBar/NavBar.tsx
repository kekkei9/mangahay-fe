import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef } from "react";

const NavBar = () => {
  const { data } = useSession();
  const router = useRouter();
  const menuRef = useRef<Menu>(null);

  return (
    <div className="h-10 fixed top-0 left-0 z-50 ">
      <div className="flex justify-around w-screen px-4">
        <div>Just a simple navbar</div>
        {data ? (
          <>
            <Button
              label={`Hi, ${data.user?.name}`}
              onClick={(e) => menuRef.current?.toggle(e)}
            />
            <Menu
              popup
              ref={menuRef}
              className="!border-0"
              model={[
                {
                  label: "My account",
                  command: () => router.push("/auth/account"),
                },
                { label: "Log out", command: () => signOut() },
              ]}
            />
          </>
        ) : (
          <Button onClick={() => router.push("/auth/signin")}>Log in</Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
