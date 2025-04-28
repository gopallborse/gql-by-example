import { getCompany } from "./db/companies.js";
import { getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    // greeting: () => "Hello World!",

    jobs: () => getJobs(),
  },

  Job: {
    // title: "Job Title",
    title: (job) => job.title,
    company: (job) => {
      // return {
      //   id: "test-id",
      //   name: "test name",
      // };
      return getCompany(job.companyId);
    },
    date: (job) => toIsoDate(job.createdAt),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
