import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.actions";
import { State } from "../interfaces";
import { useEffect, useState } from "react";

interface Props {
  state: State;
  selectedLabels: string[];
  search: string;
}

const useIssues = ({ state, selectedLabels, search }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, search, page }],
    queryFn: () => getIssues(state, selectedLabels, search, page),
    staleTime: 1000 * 60, // 1m
  });

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) {
      return;
    }
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }
    setPage((prevPage) => prevPage - 1);
  };

  return {
    nextPage,
    prevPage,
    page,
    issuesQuery,
  };
};

export default useIssues;
