import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

import { classNames } from "../utils";
import { Link } from "react-router-dom";

export default function Pagination({ currentPage, totalPage, page }) {

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center sm:px-0 pb-4 mx-auto justify-center">
      <div className="-mt-px  flex-0 flex">
        {currentPage?<Link
          to={`/?page=${currentPage-1}`}
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </Link>:null}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPage)].map((_, i) => {
          if (i <= 9) {
            return (
              <Link
                key={i}
                to={`/?page=${i}`}
                className={classNames(
                  i == currentPage
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  " border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                )}
              >
                {i + 1}
              </Link>
            );
          }
        })}
      </div>
      <div className="-mt-px flex-0 flex">
        <Link
          to={`/?page=${currentPage+1}`}
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Link>
      </div>
    </nav>
  );
}
