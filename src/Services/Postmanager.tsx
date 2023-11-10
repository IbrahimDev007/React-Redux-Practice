// PostsManager.tsx
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useToast } from "react-toastify";
import { useAddPostMutation, useGetPostsQuery } from "../app/services/posts";
import EditablePostName from "./EditablePostName";
import PostDetail from "./PostDetail";

interface Post {
	id: string;
	name: string;
}

const AddPost: React.FC = () => {
	const initialValue: Post = { id: "", name: "" };
	const [post, setPost] = React.useState<Post>({ id: "", name: "" });
	const [addPost, { isLoading }] = useAddPostMutation();
	const toast = useToast();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPost((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleAddPost = async () => {
		try {
			await addPost(post).unwrap();
			setPost(initialValue);
		} catch {
			toast.error("We couldn't save your post, try again!", {
				autoClose: 2000,
			});
		}
	};

	return (
		<div className="flex p-5">
			<div className="flex-10">
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-gray-700 text-sm font-bold"
					>
						Post name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="Enter post name"
						value={post.name}
						onChange={handleChange}
						className="border border-gray-300 rounded-md p-2 w-full"
					/>
				</div>
			</div>
			<div className="flex-shrink">
				<button
					className={`bg-purple-500 text-white px-4 py-2 rounded ${
						isLoading && "opacity-50 cursor-not-allowed"
					}`}
					onClick={handleAddPost}
				>
					Add Post
				</button>
			</div>
		</div>
	);
};

const PostList: React.FC = () => {
	const { data: posts, isLoading } = useGetPostsQuery();
	const navigate = useNavigate();

	if (isLoading) {
		return <div>Loading</div>;
	}

	if (!posts) {
		return <div>No posts :(</div>;
	}

	return (
		<ul className="list-disc ml-4">
			{posts.map(({ id, name }) => (
				<li
					key={id}
					onClick={() => navigate(`/posts/${id}`)}
					className="cursor-pointer text-green-500 hover:underline"
				>
					{name}
				</li>
			))}
		</ul>
	);
};

const PostsCountStat: React.FC = () => {
	const { data: posts } = useGetPostsQuery();

	if (!posts) return null;

	return (
		<div className="mt-4">
			<p className="text-sm text-gray-500">
				Active Posts: <span className="font-bold">{posts?.length}</span>
			</p>
		</div>
	);
};

const PostsManager: React.FC = () => {
	return (
		<div>
			<div className="flex bg-gray-800 p-4 text-white">
				<div className="flex-grow">
					<h1 className="text-xl font-bold">Manage Posts</h1>
				</div>
				<div>
					<PostsCountStat />
				</div>
			</div>
			<div className="border-b-2 p-4">
				<AddPost />
			</div>
			<div className="flex flex-wrap">
				<div className="flex-1 border-r-2 border-gray-200">
					<div className="p-4 border-b-2">
						<h2 className="text-sm font-bold">Posts</h2>
					</div>
					<div className="p-4">
						<PostList />
					</div>
				</div>
				<div className="flex-2">
					<Routes>
						<Route path="/posts/:id" element={<PostDetail />} />
						<Route
							element={
								<div className="flex items-center justify-center h-48">
									<p className="text-lg">Select a post to edit!</p>
								</div>
							}
						/>
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default PostsManager;
