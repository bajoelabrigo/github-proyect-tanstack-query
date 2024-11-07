import useLabels from "../hooks/useLabels";
import Squeleton from "../squeleton/squeleton";

interface Props {
  onLabelSelected: (label: string) => void;
  selectedLabels: string[];
}

export const LabelPicker = ({selectedLabels, onLabelSelected} : Props) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <Squeleton />;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onLabelSelected(label.name)}
          className={`animate-fade-in px-2 py-1 rounded-full text-xs font-semibold hover:bg-yellow-800 cursor-pointer
            ${selectedLabels.includes(label.name) ? 'selected-label' : ''}
            `}
          style={{ border: `1px solid #${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
