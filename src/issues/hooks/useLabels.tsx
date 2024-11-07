import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions";

const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1h
  });
  return {
    labelsQuery,
  };
};

export default useLabels;
