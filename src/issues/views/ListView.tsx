import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import useIssues from "../hooks/useIssues";
import Squeleton from "../squeleton/squeleton";
import { State } from "../interfaces";
import useDebounce from "../hooks/useDebounce";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const debounceSearchTerm = useDebounce(search, 1000);

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };
  const { issuesQuery, nextPage, prevPage, page } = useIssues({
    state,
    selectedLabels: selectedLabels,
    search: debounceSearchTerm,
  });

  const issues = issuesQuery.data ?? [];

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <Squeleton />
        ) : (
          <>
            <IssueList
              issues={issues}
              onStateChange={setState}
              state={state}
              search={search}
              setSearch={setSearch}
            />

            <div className="join items-center justify-center flex">
              <button className="join-item btn" onClick={prevPage}>
                «
              </button>
              <button className="join-item btn">{page}</button>
              <button className="join-item btn" onClick={nextPage}>
                »
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
