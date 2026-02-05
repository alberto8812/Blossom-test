import { useState } from "react";

interface props {
  comment?: string;
}
export const Inputfieled = (props: props) => {
  const [comment, setcomment] = useState<string>(props.comment || "");

  const submitComment = () => {
    // Function to handle comment submission
  };

  return (
    <div className="flex  space-x-2.5 ms:flex-col">
      <input
        type="text"
        id="last_name"
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="comment"
        required
        value={comment}
        onChange={(e) => setcomment(e.target.value)}
      />
      <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
        Submit
      </button>
    </div>
  );
};
