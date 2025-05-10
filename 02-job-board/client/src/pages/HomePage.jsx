// import { useEffect, useState } from "react";
import { useState } from "react";
import JobList from "../components/JobList";
// import { jobs } from "../lib/fake-data";
// import { getJobs } from "../lib/graphql/queries";
import { useJobs } from "../lib/graphql/hooks";
import PaginationBar from "../components/PaginationBar";

const JOBS_PER_PAGE = 5;

function HomePage() {
  // const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  // getJobs().then((jobs) => setJobs(jobs));
  //   getJobs().then(setJobs);
  // }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const { jobs, loading, error } = useJobs(
    JOBS_PER_PAGE,
    (currentPage - 1) * JOBS_PER_PAGE
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      {/* <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>{`${currentPage} of ${totalPages}`}</span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}

      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
