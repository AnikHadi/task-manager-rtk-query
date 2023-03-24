import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/projects`,
    }),
    getProject: builder.query({
      query: (id) => `/projects/${id}`,
    }),
    getProjectByName: builder.query({
      query: (name) => `/projects?projectName_like=${name}`,
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetProjectByNameQuery,
  useAddProjectMutation,
} = projectApi;
