import { Counter } from "./Fetures/Counter/Counters";
import Showpokemon from "./Fetures/showPokemon/Showpokemon";

function App() {
	return (
		<div className="grid grid-cols-2 md:lg:xl:grid-cols-3">
			<Counter />
			<Showpokemon />
		</div>
	);
}

export default App;
