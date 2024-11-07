import { githupApi } from "../../api";
import { sleep } from "../../helpers";
import { GithupIssue } from "../interfaces";

export const getIssue = async (issueNumber: number): Promise<GithupIssue> => {
  await sleep(1500);

  const { data } = await githupApi.get<GithupIssue>(`/issues/${issueNumber}`);

  //console.log(data);

  return data;
};
