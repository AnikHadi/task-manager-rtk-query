import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
      keepUnusedDataFor: 600,
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
      refetchOnFocus: true,
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const task = await queryFulfilled;
          if (task?.data?.id) {
            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                draft.push(task.data);
              })
            );
            // update messages cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const task = await queryFulfilled;

          if (task?.data?.id) {
            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                const index = draft.findIndex((item) => item.id === arg.id);
                draft[index] = task.data;
              })
            );
            // update messages cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const task = await queryFulfilled;
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const index = draft.findIndex((item) => item.id === arg);
            draft.splice(index, 1);
          })
        );
        // optimistic cache update end
        try {
          if (task?.data?.id) {
          }
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useEditTaskStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
