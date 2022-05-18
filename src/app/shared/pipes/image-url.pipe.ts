import { Pipe, PipeTransform } from '@angular/core';
import { ImageInfo } from '@app/models/image.model';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(image: ImageInfo): string {
    return `data:image/${image.extension.slice(1)};base64,${image.content}`;
  }

}
