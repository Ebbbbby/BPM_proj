import { useEffect, useState } from "react";
import { CreateQueryParams, GetSearchParams } from "./ResourceFunctions";
import { useNavigate } from "react-router-dom";

export function useSearchFilter({
  initialFilter,
  initialSort,
  from = new Date(new Date().setDate(new Date().getDate() - 31)),
  to = new Date(),
}) {
  const pro_date = (date) => new Date(date);
  const confirmDate = (date) => {
    if (pro_date(date).getFullYear() === 1970) {
      return new Date();
    }
    return date;
  };

  const [find, setFind] = useState(false);
  const [sort, setSort] = useState(
    GetSearchParams("sort") || initialSort || 0
  );
  const [filter, setFilter] = useState(
    GetSearchParams("filter") || initialFilter || 0
  );
  const [pageSize, setPageSize] = useState(GetSearchParams("pageSize") || 10);
  const [currentPage, setCurrentPage] = useState(
    GetSearchParams("currentPage") || 1
  );
  const [searchText, setSearchText] = useState(
    GetSearchParams("searchText") || ""
  );
  const [date, setDate] = useState({
    from: confirmDate(pro_date(GetSearchParams("from"))) || from,
    to: confirmDate(pro_date(GetSearchParams("to"))) || to,
  });

  const navigate = useNavigate();

  const findSearch = () => {
    setFind(!find);
  };

  useEffect(() => {
    const queryParams = CreateQueryParams({
      searchText,
      filter,
      pageSize,
      currentPage,
      from: date?.from,
      to: date?.to,
      sort,
    });

    if (queryParams) {
      navigate(`${queryParams}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find, currentPage, pageSize]);

  return {
    searchText,
    filter,
    pageSize,
    currentPage,
    setSearchText,
    setFilter,
    setPageSize,
    setCurrentPage,
    date,
    setDate,
    find,
    findSearch,
    sort,
    setSort,
  };
}
