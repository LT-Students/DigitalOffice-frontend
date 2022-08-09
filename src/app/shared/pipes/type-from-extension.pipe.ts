import { Pipe, PipeTransform } from '@angular/core';

const EXTENSION_TYPES_MAP = new Map([
	['aac', 'audio/aac'],
	['bmp', 'image/bmp'],
	['bzip', 'application/x-bzip'],
	['bzip2', 'application/x-bzip2'],
	['css', 'text/css'],
	['csv', 'text/csv'],
	['doc', 'application/msword'],
	['gzip', 'application/gzip'],
	['gif', 'image/gif'],
	['html', 'text/html'],
	['jar', 'application/java-archive'],
	['jpeg', 'image/jpeg'],
	['jpg', 'image/jpeg'],
	['js', 'text/javascript'],
	['json', 'application/json'],
	['midi', 'audio/midi'],
	['js', 'text/javascript'],
	['mpeg', 'audio/mpeg'],
	['mpeg', 'video/mpeg'],
	['ogg', 'audio/ogg'],
	['ogg', 'video/ogg'],
	['ogg', 'application/ogg'],
	['otf', 'font/otf'],
	['png', 'image/png'],
	['pdf', 'application/pdf'],
	['pptx', 'application/vnd.ms-powerpoint'],
	['rar', 'application/vnd.rar'],
	['svg', 'image/svg+xml'],
	['tar', 'application/x-tar'],
	['tiff', 'image/tiff'],
	['ttf', 'font/ttf'],
	['txt', 'text/plain'],
	['wav', 'audio/wav'],
	['webm', 'audio/webm'],
	['webm', 'video/webm'],
	['webm', 'image/webp'],
	['woff', 'font/woff'],
	['woff2', 'font/woff2'],
	['xlsx', 'application/vnd.ms-excel'],
	['xml', 'application/xml '],
	['xml', 'text/xml'],
	['zip', 'application/zip'],
	['3gpp', 'video/3gpp'],
	['3gpp', 'audio/3gpp'],
	['3gpp2', 'video/3gpp2'],
	['3gpp2', 'audio/3gpp2'],
	['7z', 'application/x-7z-compressed'],
]);

@Pipe({
	name: 'typeFromExtension',
})
export class TypeFromExtensionPipe implements PipeTransform {
	transform(extension: string): string {
		return getTypeFromExtension(extension);
	}
}

export function getTypeFromExtension(extension: string): string {
	return EXTENSION_TYPES_MAP.get(extension) || 'text/plain';
}
