import { MailMessageType } from "types/common";

export default function Error(props: Pick<MailMessageType, "message">) {
  return (
    <div className="text-[#d32f2f] text-[12px] text-left font-['Nunito_Sans']">
      {props.message}
    </div>
  );
}
