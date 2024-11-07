import { githupApi } from "../../api";
import { sleep } from "../../helpers";
import { GithupIssue, State } from "../interfaces";

export const getIssues = async (
  state: State,
  selectedLabels: string[],
  page: number,
  search: string,
): Promise<GithupIssue[]> => {
  await sleep(1500);

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  if (selectedLabels.length > 0) {
    params.append("labels", selectedLabels.join(","));
  }

  params.append("page", `${page}`);
  params.append("per_page", "5");

  if (search) {
    params.append("search", search);
  }

  const { data } = await githupApi.get<GithupIssue[]>("/issues", {
    params,
  });

  return data;
};
