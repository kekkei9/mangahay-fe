import { SpeedDial } from "primereact/speeddial";
import { dialItems } from "./dialItems";
import styles from "./ChapterSpeedDial.module.scss";
import { Tooltip } from "primereact/tooltip";
import { Chapter } from "@/types/Chapter";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import ChapterReportBoxContainer from "./ChapterReportBox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Toast, ToastMessage } from "primereact/toast";
import { authErrorToastBody } from "@/components/Comic/ComicDetail/toastBody";

interface IChapterSpeedDialProps {
  className?: string;
  chapter?: Chapter;
}

const ChapterSpeedDial = ({ className, chapter }: IChapterSpeedDialProps) => {
  const router = useRouter();
  const [isReportBoxOpen, setIsReportBoxOpen] = useState(false);
  const toastRef = useRef<Toast>(null);

  const { isAuthUser } = useSelector(
    (state: RootState) => state.authentication
  );

  const checkAuth = () => {
    if (!isAuthUser) {
      toastRef.current?.show(
        authErrorToastBody(() => router.push("/signin")) as ToastMessage
      );
      return false;
    }
    return true;
  };

  const mappedDialItems = dialItems.map((item) => {
    let additionalAction: () => void = () => {};

    switch (item.label) {
      case "Về trang chủ":
        additionalAction = () => router.push("/");
        break;
      case "Báo cáo":
        additionalAction = () => checkAuth() && setIsReportBoxOpen(true);
        break;
      case "Bình luận":
        additionalAction = () => {
          const element = document.querySelector(".comment-section");
          element?.scrollIntoView({ behavior: "smooth" });
        };
        break;
      case "Chương kế tiếp":
        additionalAction = () =>
          chapter?.nextChapter &&
          router.push(
            `/comic/${chapter?.comicInfo?.slug}/${chapter?.nextChapter?.slug}`
          );
        break;
      case "Chương trước":
        additionalAction = () => {
          if (chapter?.prevChapter)
            router.push(
              `/comic/${chapter?.comicInfo?.slug}/${chapter?.prevChapter?.slug}`
            );
        };
    }

    return { ...item, command: additionalAction };
  });

  return (
    <>
      <Toast ref={toastRef} />
      <Dialog
        onHide={() => setIsReportBoxOpen(false)}
        visible={isReportBoxOpen}
      >
        <ChapterReportBoxContainer />
      </Dialog>

      <Tooltip
        target=".speeddial-bottom-right .p-speeddial-action"
        position="left"
      />
      <SpeedDial
        model={mappedDialItems}
        direction="up"
        transitionDelay={50}
        showIcon="pi pi-bars text-white"
        hideIcon="pi pi-times text-white"
        className={`speeddial-bottom-right ${styles["custom-chapter-speed-dial"]} ${className}`}
      />
    </>
  );
};

export default ChapterSpeedDial;
