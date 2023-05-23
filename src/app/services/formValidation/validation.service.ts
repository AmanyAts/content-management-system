import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface BooleanFn {
  (): boolean;
}

/**
 * A conditional validator generator. Assigns a validator to the form control if the predicate function returns true on the moment of validation
 * @example
 * @param predicate
 * @param validator
 * @param errorNamespace optional argument that creates own namespace for the validation error
 */
export function conditionalValidator(predicate: BooleanFn,
                              validator: ValidatorFn,
                              errorNamespace?: string): ValidatorFn {
  return (formControl => {
    if (!formControl.parent) {
      return null;
    }
    let error = null;
    if (predicate()) {
      error = validator(formControl);
    }
    if (errorNamespace && error) {
      const customError:any = {};
      customError[errorNamespace] = error;
      error = customError
    }
    return error;
  })
}