import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { decrement, increment } from "./slice";

export function Counters() {
	const count = useSelector((state: RootState) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div className="bg-gradient-to-b from-blue-500 to-purple-500 h-screen flex justify-center items-center">
			<div className="bg-white rounded-lg p-4 shadow-lg">
				<div className="text-3xl text-gray-800 font-bold text-center mb-4">
					Counter Value: {count}
				</div>
				<div className="flex justify-center space-x-4">
					<button
						className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full focus:outline-none"
						aria-label="Increment value"
						onClick={() => dispatch(increment())}
					>
						Increment
					</button>
					<button
						className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none"
						aria-label="Decrement value"
						onClick={() => dispatch(decrement())}
					>
						Decrement
					</button>
				</div>
			</div>
		</div>
	);
}
