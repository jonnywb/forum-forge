import { nums, pageNumActive, num } from "./Page.module.css";

const Page = ({ pageNums, page, setPage }) => {
  const handlePageClick = (event) => {
    const p = event.target.getAttribute("index");
    setPage(+p);
  };

  return (
    <nav className={nums}>
      {pageNums.map((pageNum) => {
        console.log(page, pageNum);
        return (
          <a className={pageNum === page ? pageNumActive : num} index={pageNum} key={pageNum} onClick={handlePageClick}>
            {pageNum}
          </a>
        );
      })}
    </nav>
  );
};

export default Page;
