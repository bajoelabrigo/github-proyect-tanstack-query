import { useQuery } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issues", issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60, // 1m
    retry: false,
  });

  // const commentsQuery = useQuery({
  //   queryKey: ["issues", issueNumber, "comments"],
  //   queryFn: () => getIssueComments(issueNumber),
  //   staleTime: 1000 * 60, // 1m
  //   retry: false,
  // });

  //TRAER INFORMACION EN PARALELO, CUANDO LA INFORMACION DEPENDE DEL ISSUEQUERY Y YO QUIERO SACAR DE AHI LOS COMENTARIOS

  const issueNumberData = issueQuery.data?.number;

  const commentsQuery = useQuery({
    queryKey: ["issues", issueNumberData, "comments"],
    queryFn: () => getIssueComments(issueNumberData ?? 0),
    staleTime: 1000 * 60, // 1m
    retry: false,
    enabled: issueQuery.data !== undefined,
  });

  //console.log(issuesQuery.data);
  return {
    issueQuery,
    commentsQuery,
  };
};
