import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GithupIssue, State } from "../interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";
import { timeSince } from "../../helpers";

interface Props {
  issue: GithupIssue;
}

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //Traer la data con tan solo poner el mouse sobre el issue
  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number, "comments"],
      queryFn: () => getIssueComments(issue.number),
      staleTime: 1000 * 60,
    });
  };

  return (
    <div
      onMouseEnter={prefetchData}
      className="animate-fade-in flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === State.Closed ? (
        <FiCheckCircle size={30} color="green" className="min-w-10" />
      ) : (
        <FiInfo size={30} color="red" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          {issue.number} {timeSince(issue.created_at)} ago by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>
      </div>

      <div className="flex flex-wrap">
        {issue.labels.map((label) => (
          <span
            key={label.id}
            className="px-2 m-1 py-1 rounded-md text-white text-xs "
            style={{ border: `1px solid #${label.color}` }}
          >
            {label.name}
          </span>
        ))}
      </div>
      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
