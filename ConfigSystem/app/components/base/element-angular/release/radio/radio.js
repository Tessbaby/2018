import { Component, Input, Output, EventEmitter, ElementRef, Optional, forwardRef, } from '@angular/core';
import { ElRadioGroup } from './radio-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElRadio {
    /**
     * @param {?} rootGroup
     * @param {?} el
     */
    constructor(rootGroup, el) {
        this.rootGroup = rootGroup;
        this.el = el;
        this.disabled = false;
        this.label = '';
        this.nativeName = '';
        this.modelChange = new EventEmitter();
        this.isFocus = false;
        this.parentIsGroup = false;
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @return {?}
     */
    changeHandle() {
        if (this.parentIsGroup) {
            return this.rootGroup.changeHandle(this.label);
        }
        this.model = this.label;
        this.modelChange.emit(this.label);
        this.controlChange(this.label);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ nativeElement = this.el.nativeElement;
        const /** @type {?} */ update = () => {
            this.disabled = this.rootGroup.disabled;
            this.model = this.rootGroup.model;
        };
        this.parentIsGroup = isParentTag(nativeElement, 'el-radio-group');
        removeNgTag(nativeElement);
        if (this.parentIsGroup && this.rootGroup) {
            update();
            this.rootGroup.subscriber.push(update);
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
ElRadio.decorators = [
    { type: Component, args: [{
                selector: 'el-radio',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElRadio),
                        multi: true
                    }],
                template: `
    <label class="el-radio" role="radio" tabindex="0">
      <span class="el-radio__input"
        style="float: left;"
        [class.is-disabled]="disabled"
        [class.is-checked]="model === label"
        [class.is-focus]="isFocus">
        <span class="el-radio__inner"></span>
        <input class="el-radio__original" type="radio"
          [value]="label" [name]="nativeName" [disabled]="disabled"
          (focus)="isFocus = true" (blur)="isFocus = false"
          [ngModel]="model" (ngModelChange)="changeHandle()">
      </span>
      <span class="el-radio__label"><ng-content></ng-content></span>
    </label>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElRadio.ctorParameters = () => [
    { type: ElRadioGroup, decorators: [{ type: Optional },] },
    { type: ElementRef, },
];
ElRadio.propDecorators = {
    'disabled': [{ type: Input },],
    'label': [{ type: Input },],
    'nativeName': [{ type: Input, args: ['name',] },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElRadio_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRadio.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRadio.ctorParameters;
    /** @type {?} */
    ElRadio.propDecorators;
    /** @type {?} */
    ElRadio.prototype.disabled;
    /** @type {?} */
    ElRadio.prototype.label;
    /** @type {?} */
    ElRadio.prototype.nativeName;
    /** @type {?} */
    ElRadio.prototype.model;
    /** @type {?} */
    ElRadio.prototype.modelChange;
    /** @type {?} */
    ElRadio.prototype.isFocus;
    /** @type {?} */
    ElRadio.prototype.parentIsGroup;
    /** @type {?} */
    ElRadio.prototype.controlChange;
    /** @type {?} */
    ElRadio.prototype.controlTouch;
    /** @type {?} */
    ElRadio.prototype.rootGroup;
    /** @type {?} */
    ElRadio.prototype.el;
}
//# sourceMappingURL=radio.js.map