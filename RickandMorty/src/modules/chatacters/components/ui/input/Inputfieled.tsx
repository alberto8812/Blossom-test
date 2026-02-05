import { useState } from "react";
import { useSaveData } from "../../../../../shared/presentation/hooks/use-SelectPetition-module";
import { updateCharacterComment } from "../../../api/update-character";

interface Props {
  comment?: string;
  id: string;
}

export const Inputfieled = ({ comment: initialComment, id }: Props) => {
  const [comment, setComment] = useState(initialComment || "");
  console.log("Inputfieled rendered with id:", id, "and initialComment:", {
    initialComment,
    id,
  });
  const { mutate, isPending } = useSaveData(
    ["GET_CHARACTER_BY_ID", id],
    (newComment: string) => updateCharacterComment({ id, comment: newComment }),
  );

  const handleSubmit = () => {
    if (!comment.trim()) return;
    mutate(comment);
  };

  return (
    <div className="flex space-x-2.5">
      <input
        type="text"
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Submit"}
      </button>
    </div>
  );
};
