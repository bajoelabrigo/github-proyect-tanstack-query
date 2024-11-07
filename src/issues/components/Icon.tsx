interface Props {
    Icon?: any
    icon?: any
}

const Input = ({ icon: Icon, ...props } : Props) => {
  return (
    <div className="relative ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-gray-400" />
      </div>
      <input
        {...props}
        className="pl-10 bg-gray-700 input input-bordered w-full text-white placeholder:text-gray-400"
        />
    </div>
  );
};

export default Input;
