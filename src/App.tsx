import { Counter } from "./Fetures/Counter/Counters";
import Showpokemon from "./Fetures/showPokemon/Showpokemon";
import PostsManager from "./Services/Postmanager";

function App() {
	return (
		<div className="grid grid-cols-2 md:lg:xl:grid-cols-3">
			<Counter />
			<Showpokemon />
			<Routes>
				<Route path="*" element={<PostsManager />} />
			</Routes>
		</div>
	);
}

export default App;
