import { getCompany } from "./db/companies.js";
import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    // greeting: () => "Hello World!",

    jobs: () => getJobs(),
    job: (_root, { id }) => getJob(id),
    company: (_root, { id }) => getCompany(id),
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

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
