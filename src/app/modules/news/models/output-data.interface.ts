import { BlockToolData } from '@editorjs/editorjs/types/tools';
import { BlockTuneData } from '@editorjs/editorjs/types/block-tunes/block-tune-data';

export interface IOutputBlockData<Type extends string = string, Data extends object = any> {
	id?: string;
	type: Type;
	data: BlockToolData<Data>;
	tunes?: { [name: string]: BlockTuneData };
}

export interface IOutputData {
	version?: string;
	time?: number;
	blocks: IOutputBlockData[];
}
