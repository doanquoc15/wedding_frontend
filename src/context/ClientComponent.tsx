
import { ReactNode } from "react";

export default function ClientComponent({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
