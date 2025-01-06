import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate } from "react-router-dom";

type Props = {
  totalRecords: number;
  currentPage: number;
  limit: number;
};

export const PaginationContainer = ({
  currentPage,
  totalRecords,
  limit,
}: Props) => {
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    navigate(`/?page=${page}&limit=${limit}`);
  };

  if (!limit) return null;

  return (
    <div className="my-4">
      <PaginationControl
        next
        last
        page={+currentPage}
        total={totalRecords}
        limit={+limit}
        changePage={handlePageChange}
        ellipsis={1}
      />
    </div>
  );
};
