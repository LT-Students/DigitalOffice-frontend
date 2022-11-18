export enum WikiNodeType {
	Rubric = 'rubric',
	SubRubric = 'subrubric',
	Article = 'article',
}

export class WikiNodeTypes {
	public static getTypes() {
		return [
			{ label: 'Рубрику', value: WikiNodeType.Rubric },
			{ label: 'Подрубрику', value: WikiNodeType.SubRubric },
			{ label: 'Статью', value: WikiNodeType.Article },
		];
	}
}
