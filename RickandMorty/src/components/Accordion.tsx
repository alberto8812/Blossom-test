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
    <div className="my-2 sm:my-4 md:my-6 shadow-sm cursor-pointer bg-white">
      <div className="px-6 text-left items-center h-20 select-none flex justify-between flex-row">
        <h5 className="flex-1">{title}</h5>
        <div className="flex-none pl-2" onClick={toggleExpanded}>
          {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div
        className={`px-6 pt-0 overflow-hidden transition-[max-height] duration-500 ease-in overflow-y-auto ${
          expanded ? style : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
