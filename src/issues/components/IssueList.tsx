import { Search, UserPlus } from "lucide-react";
import { GithupIssue, State } from "../interfaces";
import { IssueItem } from "./IssueItem";
import Input from "./Icon";

interface Props {
  issues: GithupIssue[];
  state: State;
  onStateChange: (state: State) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const IssueList = ({
  issues,
  onStateChange,
  state,
  search,
  setSearch,
}: Props) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4">
        <button
          onClick={() => onStateChange(State.All)}
          className={`btn ${state === State.All ? "btn-active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => onStateChange(State.Open)}
          className={`btn ${state === State.Open ? "btn-active" : ""}`}
        >
          Open
        </button>
        <button
          onClick={() => onStateChange(State.Closed)}
          className={`btn ${state === State.Closed ? "btn-active" : ""}`}
        >
          Closed
        </button>

        <div>
          <Input
            icon={Search}
            type="text"
            placeholder="Search issues..."
            className="input input-bordered bg-slate-600 w-full max-w-xs text-white"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issues
          .filter(
            (issue) =>
              (issue.title && issue.title.toLowerCase().includes(search)) ||
              (issue.body && issue.body.toLowerCase().includes(search)) ||
              (issue.user.login &&
                issue.user.login.toLowerCase().includes(search))
          )
          .map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
      </div>
    </>
  );
};
