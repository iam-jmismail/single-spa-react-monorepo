import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePagination = () => {
  const location = useLocation();

  const [page, setPageNo] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const page = urlParams.get("page");
    const limit = urlParams.get("limit");

    setPageNo(typeof page === "string" ? +page : 1);
    setLimit(typeof limit === "string" ? +limit : 5);
  }, [location]);

  return { page, limit };
};

export default usePagination;
