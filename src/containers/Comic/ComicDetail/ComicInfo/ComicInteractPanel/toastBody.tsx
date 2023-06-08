import { Button } from "primereact/button";

export const authErrorToastBody = (onClick: () => void) => ({
  severity: "error",
  content: (
    <div className="w-full flex justify-between items-center">
      <div>
        <div className="font-semibold">Bạn chưa đăng nhập</div>
        <div className="mt-2">Bạn cần đăng nhập để thực hiện tính năng này</div>
      </div>
      <Button onClick={onClick} className="flex-shrink-0 h-fit">
        Đăng nhập
      </Button>
    </div>
  ),
});
