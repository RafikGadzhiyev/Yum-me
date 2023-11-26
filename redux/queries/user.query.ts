import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const userAPI = createApi({
	reducerPath: "user",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL + "/api/user",
	}),
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => `/profile`,
		}),
	}),
});

export const { useGetUserQuery } = userAPI;
