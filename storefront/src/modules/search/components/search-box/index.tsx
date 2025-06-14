import { XMarkMini } from "@medusajs/icons";
import { FormEvent } from "react";
import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from "../search-box-wrapper";

const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit) {
      onSubmit(event);
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onReset(event);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div {...props} className="w-full">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center justify-between font-sans">
          <input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="h-6 flex-1 translate-y-[2px] bg-transparent text-base text-white placeholder:text-[#9FA2A5] placeholder:transition-colors focus:outline-none"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="flex items-center justify-center gap-x-2 px-2 text-base text-white focus:outline-none"
            >
              <XMarkMini />
              <span className={"translate-y-[2px]"}>Cancel</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const SearchBox = ({ onClick }: { onClick?: VoidFunction }) => {
  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchBox {...props} onClick={onClick} />
          </>
        );
      }}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
