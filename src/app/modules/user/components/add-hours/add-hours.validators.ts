import { AbstractControl, ValidatorFn } from '@angular/forms';

export function timeValidator(
  countMaxPossibleHours: () => number
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    +control.value < countMaxPossibleHours()
      ? null
      : { periodExceedsMaxValue: true };
}
