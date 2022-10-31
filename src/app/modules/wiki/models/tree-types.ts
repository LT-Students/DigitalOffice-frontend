export interface WikiTreeNode {
	id: string;
	parentId?: string;
	type: 'rubric' | 'article';
	name: string;
	isActive: boolean;
	children?: WikiTreeNode[];
}

export interface WikiTreeFlatNode {
	id: string;
	parentId?: string;
	type: 'rubric' | 'article';
	name: string;
	isActive: boolean;
	children?: string[];
	level: number;
	expandable: boolean;
}
