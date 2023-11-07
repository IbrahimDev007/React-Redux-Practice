import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { decrement, increment } from "./slice";

export function Counter() {
	const count = useSelector((state: RootState) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div className="card w-96 glass">
			<div className="card-body">
				<h2 className="card-title my-2">
					count <span className="mx-3 badge badge-secondary">{count}</span>
				</h2>
				<p>
					Here is two state increment and decrement <br />
					just click and show result
				</p>
				<div className="card-actions justify-between mt-2">
					<button
						className="btn btn-success"
						onClick={() => dispatch(increment())}
					>
						Increment
					</button>
					<button
						className="btn btn-error"
						onClick={() => dispatch(decrement())}
					>
						Decrement
					</button>
				</div>
			</div>
		</div>
	);
}
