// EditablePostName.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useToast } from "react-toastify";
import {
	useGetPostQuery,
	useDeletePostMutation,
	useUpdatePostMutation,
} from "../Services/Post.ts";

interface EditablePostNameProps {
	name: string;
	onUpdate: (name: string) => void;
	onCancel: () => void;
	isLoading?: boolean;
}

export const EditablePostName: React.FC<EditablePostNameProps> = ({
	name: initialName,
	onUpdate,
	onCancel,
	isLoading = false,
}) => {
	const [name, setName] = useState(initialName);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

	const handleUpdate = () => onUpdate(name);
	const handleCancel = () => onCancel();

	return (
		<div className="flex">
			<div className="flex-10">
				<input
					type="text"
					onChange={handleChange}
					value={name}
					disabled={isLoading}
					className="p-2 border border-gray-300 rounded-md w-full"
				/>
			</div>
			<div className="flex-shrink">
				<div className="space-x-4 flex items-center">
					<button
						onClick={handleUpdate}
						className={`bg-blue-500 text-white px-4 py-2 rounded ${
							isLoading && "opacity-50 cursor-not-allowed"
						}`}
					>
						Update
					</button>
					<button
						className="bg-red-500 text-white px-4 py-2 rounded"
						onClick={handleCancel}
						disabled={isLoading}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

// PostDetail.tsx

export const PostDetail: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	// const toast = useToast();

	const [isEditing, setIsEditing] = useState(false);

	const { data: post, isLoading } = useGetPostQuery(id);

	const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

	const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!post) {
		return (
			<div className="flex items-center justify-center h-48">
				<p className="text-lg">
					Post {id} is missing! Try reloading or selecting another post...
				</p>
			</div>
		);
	}

	return (
		<div className="p-4">
			{isEditing ? (
				<EditablePostName
					name={post.name}
					onUpdate={async (name) => {
						try {
							const response = await updatePost({ id, name }).unwrap();
							// Handle success, maybe show a toast or update UI
							console.log("Post updated successfully:", response);
						} catch (error) {
							// Handle error, show a toast or update UI
							console.error("Error updating post:", error);
						} finally {
							setIsEditing(false);
						}
					}}
					onCancel={() => setIsEditing(false)}
					isLoading={isUpdating}
				/>
			) : (
				<div className="flex items-center">
					<div className="flex-grow">
						<h2 className="text-2xl">{post.name}</h2>
					</div>
					<div className="space-x-4">
						<button
							onClick={() => setIsEditing(true)}
							disabled={isDeleting || isUpdating}
							className={`bg-blue-500 text-white px-4 py-2 rounded ${
								isUpdating && "opacity-50 cursor-not-allowed"
							}`}
						>
							{isUpdating ? "Updating..." : "Edit"}
						</button>
						<button
							onClick={() => deletePost(id).then(() => navigate("/posts"))}
							disabled={isDeleting}
							className="bg-red-500 text-white px-4 py-2 rounded"
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</button>
					</div>
				</div>
			)}
			<PostJsonDetail id={post.id} />
		</div>
	);
};

// PostJsonDetail.tsx

interface PostJsonDetailProps {
	id: string;
}

const PostJsonDetail: React.FC<PostJsonDetailProps> = ({ id }) => {
	const { data: post } = useGetPostQuery(id);

	return (
		<div className="mt-5 bg-gray-200 p-4">
			<pre>{post ? JSON.stringify(post, null, 2) : "Loading..."}</pre>
		</div>
	);
};

export default PostJsonDetail;
