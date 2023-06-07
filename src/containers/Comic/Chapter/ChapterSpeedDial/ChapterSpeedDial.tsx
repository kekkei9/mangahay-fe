import { SpeedDial } from "primereact/speeddial";
import { dialItems } from "./dialItems";
import styles from "./ChapterSpeedDial.module.scss";
import { Tooltip } from "primereact/tooltip";
import { Chapter } from "@/types/Chapter";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Toast, ToastMessage } from "primereact/toast";
import { authErrorToastBody } from "../../ComicDetail/ComicInfo/ComicInteractPanel/toastBody";
import { ToastContext } from "@/contexts/ToastContext";

interface IChapterSpeedDialProps {
  className?: string;
  chapter?: Chapter;
  onClickReport: () => void;
}

const ChapterSpeedDial = ({
  className,
  chapter,
  onClickReport,
}: IChapterSpeedDialProps) => {
  const router = useRouter();

  const { isAuthUser } = useSelector(
    (state: RootState) => state.authentication
  );

  const { toastRef } = useContext(ToastContext);

  const checkAuth = () => {
    if (!isAuthUser) {
      toastRef?.current?.show(
        authErrorToastBody(() => router.push("/auth/signin")) as ToastMessage
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
        additionalAction = () => checkAuth() && onClickReport();
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
