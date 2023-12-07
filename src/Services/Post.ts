// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
	id: number;
	name: string;
}

type PostsResponse = Post[];

export const postApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({ baseUrl: " http://localhost:3000" }),
	tagTypes: ["Posts"],
	endpoints: (build) => ({
		getPosts: build.query<PostsResponse, void>({
			query: () => "posts",
			providesTags: (result) => {
				console.log(result);

				return result
					? [
							...result.map(({ id }) => ({ type: "Posts", id } as const)),
							{ type: "Posts", id: "LIST" },
					  ]
					: [{ type: "Posts", id: "LIST" }];
			},
		}),
		addPost: build.mutation<Post, Partial<Post>>({
			query(body) {
				return {
					url: `post`,
					method: "POST",
					body,
				};
			},

			invalidatesTags: [{ type: "Posts", id: "LIST" }],
		}),
		getPost: build.query<Post, number>({
			query: (id) => `post/${id}`,
			providesTags: (result, error, id) => [{ type: "Posts", id }],
		}),
		updatePost: build.mutation<Post, Partial<Post>>({
			query(data) {
				const { id, ...body } = data;
				return {
					url: `post/${id}`,
					method: "PUT",
					body,
				};
			},
			invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
		}),
		deletePost: build.mutation<{ success: boolean; id: number }, number>({
			query(id) {
				return {
					url: `post/${id}`,
					method: "DELETE",
				};
			},

			invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useAddPostMutation,
	useGetPostQuery,
	useUpdatePostMutation,
	useDeletePostMutation,
} = postApi;
