import { Component, forwardRef } from '@angular/core';
import { ElInputNumberPoprs } from './input-number-props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElInputNumber extends ElInputNumberPoprs {
    constructor() {
        super();
        this.minDisabled = false;
        this.maxDisabled = false;
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    changeHandle(value) {
        const /** @type {?} */ oldValue = this.model;
        this.model = value;
        if (Number.isNaN(+this.model)) {
            this.model = oldValue;
            return;
        }
        this.maxDisabled = value > this.max;
        this.minDisabled = value < this.min;
        if (this.maxDisabled)
            return this.dispatchModel(this.max);
        if (this.minDisabled)
            return this.dispatchModel(this.min);
        this.modelChange.emit(value);
    }
    /**
     * @param {?} limit
     * @return {?}
     */
    dispatchModel(limit) {
        const /** @type {?} */ timer = setTimeout(() => {
            this.model = limit;
            this.modelChange.emit(limit);
            clearTimeout(timer);
        }, this.debounce);
    }
    /**
     * @param {?=} calcType
     * @return {?}
     */
    decreaseHandle(calcType = true) {
        if (this.disabled)
            return;
        const /** @type {?} */ step = calcType ? this.step : 0 - this.step;
        const /** @type {?} */ val = Number(this.model) + step;
        if (Number.isNaN(val))
            return;
        this.maxDisabled = val > this.max;
        this.minDisabled = val < this.min;
        if (!this.maxDisabled && !this.minDisabled) {
            this.model = val;
            this.modelChange.emit(this.model);
            this.controlChange(this.model);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.model = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.controlChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.controlTouch = fn;
    }
}
ElInputNumber.decorators = [
    { type: Component, args: [{
                selector: 'el-input-number',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElInputNumber),
                        multi: true
                    }],
                styles: [`
    .el-input-spin-button::-webkit-inner-spin-button { visibility: hidden; -webkit-appearance: none; }
    .el-input-spin-button { -moz-appearance: textfield; }
  `],
                template: `
    <div [class]="'el-input-number' + (size ? ' el-input-number--' + size : '')"
      [class.is-disabled]="disabled" [class.is-without-controls]="!controls">
      <span *ngIf="controls" class="el-input-number__decrease" role="button"
        [class.is-disabled]="minDisabled" (click)="decreaseHandle(false)">
        <i class="el-icon-minus"></i>
      </span>
      <span *ngIf="controls" class="el-input-number__increase" role="button"
        [class.is-disabled]="maxDisabled" (click)="decreaseHandle(true)">
        <i class="el-icon-plus"></i>
      </span>

      <div [class]="'el-input ' + (size ? ' el-input--' + size : '')" [class.is-disabled]="disabled">
        <input class="el-input__inner el-input-spin-button  " autocomplete="off" role="spinbutton"
          [attr.max]="max" [attr.min]="min" [attr.aria-valuemax]="max" [attr.aria-valuemin]="min"
          [disabled]="disabled" [value]="model" [ngModel]="model" (ngModelChange)="changeHandle($event)"
          type="number" rows="2" aria-valuenow="1" [attr.aria-disabled]="disabled">
      </div>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElInputNumber.ctorParameters = () => [];
function ElInputNumber_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInputNumber.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElInputNumber.ctorParameters;
    /** @type {?} */
    ElInputNumber.prototype.minDisabled;
    /** @type {?} */
    ElInputNumber.prototype.maxDisabled;
    /** @type {?} */
    ElInputNumber.prototype.controlChange;
    /** @type {?} */
    ElInputNumber.prototype.controlTouch;
}
//# sourceMappingURL=input-number.js.map