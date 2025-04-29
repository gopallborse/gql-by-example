import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import {
  getJobs,
  getJob,
  getJobsByCompany,
  createJob,
  updateJob,
  deleteJob,
} from "./db/jobs.js";

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

  Mutation: {
    // createJob: (_root, { title, description }) => {
    createJob: (_root, { input: { title, description } }) => {
      const companyId = "FjcJCHJALA4i"; // TODO to be set based on user
      return createJob({ companyId, title, description });
    },

    updateJob: (_root, { input: { id, title, description } }) => {
      return updateJob({ id, title, description });
    },

    deleteJob: (_root, { id }) => deleteJob(id),
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
