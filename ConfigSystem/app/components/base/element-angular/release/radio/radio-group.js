import { Component, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElRadioGroup {
    constructor() {
        this.fillColor = '#20a0ff';
        this.textColor = '#ffffff';
        this.disabled = false;
        this.modelChange = new EventEmitter();
        this.subscriber = [];
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @param {?} nextValue
     * @return {?}
     */
    changeHandle(nextValue) {
        setTimeout(() => {
            this.model = nextValue;
            this.modelChange.emit(nextValue);
            this.controlChange(nextValue);
            this.subscriber.forEach(sub => sub());
        }, 0);
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
ElRadioGroup.decorators = [
    { type: Component, args: [{
                selector: 'el-radio-group',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElRadioGroup),
                        multi: true
                    }],
                template: `
    <div class="el-radio-group" role="radiogroup">
      <ng-content></ng-content>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElRadioGroup.ctorParameters = () => [];
ElRadioGroup.propDecorators = {
    'buttonSize': [{ type: Input, args: ['size',] },],
    'fillColor': [{ type: Input, args: ['fill',] },],
    'textColor': [{ type: Input },],
    'disabled': [{ type: Input },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElRadioGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRadioGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRadioGroup.ctorParameters;
    /** @type {?} */
    ElRadioGroup.propDecorators;
    /** @type {?} */
    ElRadioGroup.prototype.buttonSize;
    /** @type {?} */
    ElRadioGroup.prototype.fillColor;
    /** @type {?} */
    ElRadioGroup.prototype.textColor;
    /** @type {?} */
    ElRadioGroup.prototype.disabled;
    /** @type {?} */
    ElRadioGroup.prototype.model;
    /** @type {?} */
    ElRadioGroup.prototype.modelChange;
    /** @type {?} */
    ElRadioGroup.prototype.subscriber;
    /** @type {?} */
    ElRadioGroup.prototype.controlChange;
    /** @type {?} */
    ElRadioGroup.prototype.controlTouch;
}
//# sourceMappingURL=radio-group.js.map