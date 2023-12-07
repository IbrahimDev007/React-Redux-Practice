import { Route, Routes } from "react-router-dom";
import { Counter } from "./Fetures/Counter/Counters";
import Showpokemon from "./Fetures/showPokemon/Showpokemon";
import PostsManager from "./Services/Postmanager";

function App() {
	return (
		<Routes>
			{/* <Route path="*" element={<Counter />} /> */}
			{/* <Route path="*" element={<Showpokemon />} /> */}
			<Route path="*" element={<PostsManager />} />
		</Routes>
	);
}

export default App;
