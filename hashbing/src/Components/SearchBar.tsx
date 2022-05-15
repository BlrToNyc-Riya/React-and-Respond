import { useRef, useState } from "react";
import Button from "./Button";

let ref: React.LegacyRef<HTMLDivElement>;

type Props = {
  onSearch(param: string): void;
};
const SearchBar = (props: Props) => {
  console.log("props", props);
  const [searchInput, setSearchInput] = useState("");
  const clickPoint = useRef<HTMLDivElement>(null);
  const handleFocus = () => {
    if (clickPoint.current != null) clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
    if (clickPoint.current != null) clickPoint.current.style.display = "block";
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const onSearch = (reset: boolean) => {
    reset ? setSearchInput("") : null;
    reset ? props.onSearch("") : props.onSearch(searchInput);
    // !reset ? props.onSearch(searchInput) : props.onSearch("");
  };

  return (
    <div className='items-center px-4 flex justify-center w-full'>
      <div className='relative mr-3 flex justify-between w-1/2'>
        <div className='absolute top-3 left-3 items-center' ref={clickPoint}>
          <svg
            className='w-5 h-5 text-gray-500'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'></path>
          </svg>
        </div>
        <input
          type='text'
          value={searchInput}
          className='block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3'
          placeholder='Search Here...'
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={e => handleSearch(e)}
        />
        <Button name='Search' onClick={() => onSearch(false)} />
        <Button name='Clear Search' onClick={() => onSearch(true)} />
      </div>
    </div>
  );
};

export default SearchBar;
