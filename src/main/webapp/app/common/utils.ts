import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


/**
* Update all controls of the provided form group with the given data.
*/
export function updateForm(group: FormGroup, data: any) {
  for (const field in group.controls) {
    const control = group.get(field)!;
    let value = data[field] === undefined ? null : data[field];
    if (value &&
            (!control.value || control.value.constructor !== [].constructor) &&
            (value.constructor === {}.constructor || value.constructor === [].constructor)) {
      value = JSON.stringify(value, undefined, 2);
    }
    control.setValue(value);
  }
}

/**
 * Helper function for transforming a Record to a Map to support number as a key.
 */
export function transformRecordToMap(data:Record<number,number|string>):Map<number,string> {
  const dataMap = new Map();
  for (const [key, value] of Object.entries(data)) {
    dataMap.set(+key, '' + value);
  }
  return dataMap;
}

export const validDouble: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valid = control.value === null || /^(-?)[0-9]*(\.[0-9]+)?$/.test(control.value);
  return valid ? null : { validDouble: { value: control.value } };
};

export const validJson: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.value === null) {
    return null;
  }
  try {
    JSON.parse(control.value);
    return null;
  } catch (e) {
    return { validJson: { value: control.value } }
  }
};
