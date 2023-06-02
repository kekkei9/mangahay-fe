import Link from "next/link";
import { useRouter } from "next/router";

interface INavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavLink = ({ href, label, onClick }: INavLinkProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`${!router.asPath.includes(href) && "text-black"} text-xl`}
      onClick={() => onClick && onClick()}
    >
      {label.toLocaleUpperCase()}
    </Link>
  );
};

export default NavLink;
