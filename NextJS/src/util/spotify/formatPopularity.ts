export default function formatPopularity(pop: number) {
	let type = ""
	if (pop < 20){
		type = "Obscure"
	}else if (pop < 40){
		type = "Barely Popular"
	}else if (pop < 55){
		 type = "Known"
	}
	else if (pop <80){
		type = "Popular"
	}else{
		type = "Extremely Popular"
	}

	return `Top ${100 - pop}% (${type})`
}
