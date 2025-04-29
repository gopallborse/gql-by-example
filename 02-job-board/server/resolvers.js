import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    // greeting: () => "Hello World!",

    jobs: () => getJobs(),
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError(`No job found with id ${id}.`);
      }
      return job;
    },
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError(`No company found with id ${id}.`);
      }
      return company;
    },
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

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: "NOT_FOUND",
    },
  });
}
