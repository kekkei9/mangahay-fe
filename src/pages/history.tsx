import ComicCard from "@/components/Cards/ComicCard";
import CardListContainer from "@/containers/ListContainers/CardList";
import { HistoryChapter } from "@/types/Chapter";
import { useRouter } from "next/router";
import { TabView, TabPanel } from "primereact/tabview";
import styles from "@/styles/HistoryPage.module.scss";
import CardListWrapper from "@/components/CardListWrapper";
import { getAllLocalComicHistory } from "@/utils/localStorage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Button } from "primereact/button";
import Image from "next/image";

const HistoryPage = () => {
  const router = useRouter();
  const localComicHistory = getAllLocalComicHistory() || [];
  const { isAuthUser } = useSelector(
    (state: RootState) => state.authentication
  );

  return (
    <div className={styles["custom-tab-view"]}>
      <TabView renderActiveOnly={false}>
        <TabPanel header="Theo thiết bị">
          <CardListWrapper
            isEmpty={!localComicHistory.length}
            title={"Lịch sử truyện trên thiết bị"}
          >
            {localComicHistory.map((chapter) => (
              <ComicCard.History
                key={chapter.comic_id}
                data={chapter as HistoryChapter}
                onClickComic={(data) =>
                  router.push(`comic/${data?.comic_slug}`)
                }
                onClickChapter={(data) =>
                  router.push(
                    `comic/${data?.comic_slug}/${data?.chapter_slug}/${data?.chapter_id}`
                  )
                }
              />
            ))}
          </CardListWrapper>
        </TabPanel>
        <TabPanel header="Theo tài khoản">
          {isAuthUser ? (
            <CardListContainer
              title="Lịch sử truyện trên tài khoản"
              fetchUrl={(index, pageSize) =>
                `/api/user/history?page=${index}&limit=${pageSize}`
              }
            >
              {(chapter) => (
                <ComicCard.History
                  data={chapter as HistoryChapter}
                  onClickComic={(data) =>
                    router.push(`comic/${data?.comic_slug}`)
                  }
                  onClickChapter={(data) =>
                    router.push(
                      `comic/${data?.comic_slug}/${data?.chapter_slug}/${data?.chapter_id}`
                    )
                  }
                />
              )}
            </CardListContainer>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <div className="relative w-1/5 aspect-square">
                <Image
                  src="/assets/comic/empty.png"
                  alt="empty"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-semibold text-2xl">
                Bạn cần đăng nhập để sử dụng tính năng này
              </div>
              <Button
                onClick={() => router.push("auth/signin?redirectUrl=/history")}
              >
                Đăng nhập
              </Button>
            </div>
          )}
        </TabPanel>
      </TabView>
    </div>
  );
};

export default HistoryPage;
