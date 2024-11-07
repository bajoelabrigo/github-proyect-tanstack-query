import { githupApi } from "../../api";
import { sleep } from "../../helpers";
import { GithubLabel } from "../interfaces";

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  const { data } = await githupApi.get<GithubLabel[]>("labels");
  //console.log(data);
  return data;

  

  // const resp = await fetch(
  //   "https://api.github.com/repos/facebook/react/labels"
  // ).then((r) => r.json());
  // console.log(resp);
  // return resp;
};
