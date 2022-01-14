import { Affix, Input } from "antd";
import { useDebouncedCallback } from "use-debounce";
import { DEBOUNCE_TIMEOUT } from "../consts";

type Props = {
  onSearch: (term: string) => void;
  searchTerm: string | null;
  isDisabled?: boolean;
};

export const SearchBar = ({ onSearch, searchTerm, isDisabled }: Props) => {
  const debounced = useDebouncedCallback((value) => {
    onSearch(value);
  }, DEBOUNCE_TIMEOUT);

  return (
    <Affix offsetTop={10}>
      {/* 
      FIXME(workaround):
      The <Input.Search /> is wrapped in div to avoid a warning message 
      "Warning: findDOMNode is deprecated in StrictMode" in the console.

      Realted to https://github.com/ant-design/ant-design/issues/26136
     */}
      <div>
        <Input.Search
          disabled={isDisabled}
          defaultValue={searchTerm || ""}
          placeholder="input search text"
          onChange={(e) => debounced(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
    </Affix>
  );
};
