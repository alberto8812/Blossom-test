import { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface Props {
  title?: string;
  children?: React.ReactNode;
  style?: string;
  initalState?: boolean;
}

export const Accordion = ({
  title = "",
  children,
  style = "max-h-40",
  initalState = false,
}: Props) => {
  const [expanded, setExpanded] = useState(initalState);
  const toggleExpanded = () => setExpanded((current) => !current);

  return (
    <div className="cursor-pointer">
      <div
        className="flex items-center justify-between py-2 select-none"
        onClick={toggleExpanded}
      >
        <span
          className="text-xs font-medium tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {title}
        </span>
        <div className="pl-2" style={{ color: "var(--text-muted)" }}>
          {expanded ? (
            <IoIosArrowUp size={14} />
          ) : (
            <IoIosArrowDown size={14} />
          )}
        </div>
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out overflow-y-auto ${
          expanded ? style : "max-h-0"
        }`}
      >
        <div className="space-y-0.5">{children}</div>
      </div>
    </div>
  );
};
