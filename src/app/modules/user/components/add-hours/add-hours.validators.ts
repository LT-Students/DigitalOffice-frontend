import { AbstractControl, ValidatorFn } from '@angular/forms';
// import {IDatePeriod} from '../../../../interfaces/date-period.interface';

// export function timeValidator(maxPossibleHours: number): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     return +control.value < maxPossibleHours
//       ? null
//       : {'periodExceedsMaxValue': true}
//   }
// }

export function timeValidator(
  countMaxPossibleHours: () => number
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    +control.value < countMaxPossibleHours()
      ? null
      : { periodExceedsMaxValue: true };
}
