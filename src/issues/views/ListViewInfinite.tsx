import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import Squeleton from "../squeleton/squeleton";
import { State } from "../interfaces";
import useIssuesInfinite from "../hooks/useIssuesInfinite";

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };
  const { issuesQuery } = useIssuesInfinite({
    state,
    selectedLabels: selectedLabels,
  });

  const issues = issuesQuery.data?.pages.flat() ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <Squeleton />
        ) : (
          <>
            <IssueList issues={issues} onStateChange={setState} state={state} />

            <div className="join items-center justify-center flex ">
              <button
                className="btn btn-secondary w-full text-white"
                onClick={() => issuesQuery.fetchNextPage()}
                disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
              >
                {issuesQuery.isFetchingNextPage ? <span className="loading loading-spinner text-warning"></span> : "Cargar más"}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
