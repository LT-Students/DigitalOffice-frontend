export abstract class BrowserStorage {
	abstract set(key: string, value: string): void;
	abstract get(key: string): string | null;
	abstract remove(key: string): void;
	abstract clear(): void;
}
