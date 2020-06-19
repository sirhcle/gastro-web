import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';


@Pipe({
  name: 'safePipe'
})
export class SafePipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
<<<<<<< HEAD
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
=======
  transform(url): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
 
>>>>>>> 86c2efd638cae90cd92f40e7b979ac94dfb23850
  }

}
