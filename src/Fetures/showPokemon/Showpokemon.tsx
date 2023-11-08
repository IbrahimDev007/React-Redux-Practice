import { useGetPokeonByNameQuery } from "../../Services/Pokemon";

const Showpokemon = () => {
	const { error, isLoading, data } = useGetPokeonByNameQuery("bulbasaur");
	return (
		<div className="Pokemon card w-96 glass">
			{error ? (
				<>Oh no, there was an error</>
			) : isLoading ? (
				<>Loading...</>
			) : data ? (
				<>
					<h3 className=" text-center font-bold text-lg">
						{data.species.name}
					</h3>
					<figure>
						<img src={data.sprites.front_shiny} alt={data.species.name} />
					</figure>
				</>
			) : null}
		</div>
	);
};

export default Showpokemon;
