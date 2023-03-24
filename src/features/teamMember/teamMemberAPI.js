import { apiSlice } from "../api/apiSlice";

export const teamMemberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => `/team`,
    }),
    getTeam: builder.query({
      query: (id) => `/team/${id}`,
    }),
    getTeamByName: builder.query({
      query: (name) => `/team?name_like=${name}`,
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamQuery, useGetTeamByNameQuery } =
  teamMemberApi;
