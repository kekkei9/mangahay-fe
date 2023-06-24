import { SpeedDial } from "primereact/speeddial";
import { dialItems } from "./dialItems";
import styles from "./ChapterSpeedDial.module.scss";
import { Tooltip } from "primereact/tooltip";
import { Chapter } from "@/types/Chapter";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { ToastContext } from "@/contexts/ToastContext";

interface IChapterSpeedDialProps {
  className?: string;
  chapter?: Partial<Chapter>;
  onClickReport: () => void;
}

const ChapterSpeedDial = ({
  className,
  chapter,
  onClickReport,
}: IChapterSpeedDialProps) => {
  const router = useRouter();

  const { checkAuth } = useContext(ToastContext);

  const mappedDialItems = dialItems.map((item) => {
    let additionalAction: () => void = () => {};

    switch (item.label) {
      case "Về trang chủ":
        additionalAction = () => router.push("/");
        break;
      case "Báo cáo":
        additionalAction = () => checkAuth() && onClickReport();
        break;
      case "Bình luận":
        additionalAction = () => {
          const element = document.querySelector(".comment-section");
          element?.scrollIntoView({ behavior: "smooth" });
        };
        break;
      case "Quay về đầu trang":
        additionalAction = () => {
          window?.scrollTo({ top: 0, behavior: "smooth" });
        };
    }

    return { ...item, command: additionalAction };
  });

  return (
    <>
      <Tooltip target=".speeddial-bottom-right .p-speeddial-action" />
      <SpeedDial
        model={mappedDialItems}
        direction="up"
        transitionDelay={50}
        showIcon="pi pi-bars text-white"
        hideIcon="pi pi-times text-white"
        className={`speeddial-bottom-left ${styles["custom-chapter-speed-dial"]} ${className}`}
      />
    </>
  );
};

export default ChapterSpeedDial;
