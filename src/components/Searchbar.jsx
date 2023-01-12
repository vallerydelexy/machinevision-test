import { SearchIcon } from '@heroicons/react/solid'
export default function Searchbar(){
    return(
        <div className="flex-1 flex items-center py-6">
        <div className="max-w-lg w-full lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search by tag
          </label>
          <div className="relative text-gray-400 focus-within:text-gray-800">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full bg-light-blue-400 border-transparent py-2 pl-10 pr-3 text-base leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-0 focus:border-white focus:text-gray-900 focus:placeholder-gray-800 sm:text-sm rounded-md"
              placeholder="Search by tag (single tag)"
              type="search"
            />
          </div>
        </div>
      </div>
    )
}