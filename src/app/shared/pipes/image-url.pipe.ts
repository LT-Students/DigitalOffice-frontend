import { Pipe, PipeTransform } from '@angular/core';
import { IImageInfo } from '@app/models/image.model';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(image: IImageInfo): string {
    return `data:image/${image.extension.slice(1)};base64,${image.content}`;
  }

}
