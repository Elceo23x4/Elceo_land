import type { ReactNode } from "react";

interface SystemNoticeProps {
  tone: "info" | "warning" | "danger" | "success";
  title: string;
  children?: ReactNode;
}

export default function SystemNotice({ tone, title, children }: SystemNoticeProps) {
  return (
    <div className={`elceo-notice elceo-notice--${tone}`} role="alert">
      <p className="elceo-notice__title">{title}</p>
      {children && <div>{children}</div>}
    </div>
  );
}
