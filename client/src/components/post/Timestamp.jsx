/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import ReactTimeago from "react-timeago";

function Timestamp({ data, className }) {
  return (
    <ReactTimeago
      className={cn("font-medium text-primary/50 text-xs", className)}
      date={data.createdAt}
      formatter={(value, unit, suffix, epochMiliseconds, nextFormatter) => {
        if (unit === "second") {
          return `${value}${unit[0]}`;
        } else if (unit === "minute") {
          return `${value}${unit[0]}`;
        } else if (unit === "hour") {
          return `${value}${unit[0]}`;
        } else if (unit === "day") {
          return `${value}${unit[0]}`;
        } else if (unit === "week") {
          return `${value}${unit[0]}`;
        } else if (unit === "month") {
          return `${value}${unit[0]}`;
        } else if (unit === "year") {
          return `${value}${unit[0]}`;
        } else {
          return nextFormatter?.(value, unit, suffix, epochMiliseconds);
        }
      }}
    />
  );
}

export default Timestamp;
