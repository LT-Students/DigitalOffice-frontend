export function setProperty<T>(property: T): NonNullable<T> | null {
	return property ? (property as NonNullable<T>) : null;
}
