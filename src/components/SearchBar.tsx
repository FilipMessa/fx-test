import { Affix, Input } from "antd";

export const SearchBar = () => (
  <Affix offsetTop={10}>
    {/* 
      FIXME(workaround):
      The <Input.Search /> is wrapped in div to avoid a warning message 
      "Warning: findDOMNode is deprecated in StrictMode" in the console.

      Realted to https://github.com/ant-design/ant-design/issues/26136
     */}
    <div>
      <Input.Search
        placeholder="input search text"
        allowClear
        onSearch={() => null}
        style={{ width: 200 }}
      />
    </div>
  </Affix>
);
