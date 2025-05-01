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
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication.");
      }

      const companyId = user.companyId;
      return createJob({ companyId, title, description });
    },

    updateJob: async (
      _root,
      { input: { id, title, description } },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication.");
      }

      const job = await updateJob({
        id,
        companyId: user.companyId,
        title,
        description,
      });
      if (!job) {
        throw notFoundError(`No job found with id ${id}.`);
      }
      return job;
    },

    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication.");
      }

      // get job
      // check job.companyId === user.companyId
      // above approach not efficient as it needs to query database twice

      // return deleteJob(id);

      const job = await deleteJob(user.companyId);
      if (!job) {
        throw notFoundError(`No job found with id ${id}.`);
      }
      return job;
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

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: "UNAUTHORIZED",
    },
  });
}
