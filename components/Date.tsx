import { format, parseISO } from "date-fns";

type DateProperties = {
  dateString: string;
  className?: string;
};

export function Date({ dateString, className }: DateProperties) {
  const date = parseISO(dateString);
  return (
    <time className={className} dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
