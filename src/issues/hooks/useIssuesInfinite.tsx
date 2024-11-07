import { useInfiniteQuery } from "@tanstack/react-query";
import { State } from "../interfaces";
import { getIssues } from "../actions";

interface Props {
  state: State;
  selectedLabels: string[];
}

const useIssuesInfinite = ({ state, selectedLabels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({pageParam, queryKey}) => {

      const [,,args] = queryKey;
      const {state, selectedLabels} = args as Props


       return getIssues(state, selectedLabels, pageParam);
    },
    staleTime: 1000 * 60, 
    initialPageParam: 0,
    getNextPageParam: (lasPage, pages) => lasPage.length > 0 ? pages.length + 1 : undefined
  });

  return {
    issuesQuery,
  };
};

export default useIssuesInfinite;
