export interface WikiTreeFlatNode {
	id: string;
	parentId?: string;
	isRubric: boolean;
	name: string;
	isActive: boolean;
	children?: string[];
	level: number;
}

export class WikiTreeMap extends Map<string, WikiTreeFlatNode> {}
