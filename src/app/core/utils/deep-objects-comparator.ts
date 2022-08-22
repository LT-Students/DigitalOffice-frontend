export class DeepObjectsComparator {
	public static compare(obj1: any, obj2: any): boolean {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);
		if (keys1.length !== keys2.length) {
			return false;
		}
		for (const key of keys1) {
			const val1 = obj1[key];
			const val2 = obj2[key];
			const areObjects = this.isObject(val1) && this.isObject(val2);
			if ((areObjects && !DeepObjectsComparator.compare(val1, val2)) || (!areObjects && val1 !== val2)) {
				return false;
			}
		}
		return true;
	}

	private static isObject(object: any): boolean {
		return object != null && typeof object === 'object';
	}
}
