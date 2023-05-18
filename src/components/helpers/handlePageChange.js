export const handlePageChange = (pageNumber,setPage,getPageContent) => {
    setPage({activePage: pageNumber});
    getPageContent(pageNumber-1);
  } 