import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElSwitch {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.disabled = false;
        this.activeColor = '#409EFF';
        this.inactiveColor = '#C0CCDA';
        // bind value
        this.model = false;
        this.modelChange = new EventEmitter();
        this.hasText = false;
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @param {?} nextValue
     * @return {?}
     */
    changeHandle(nextValue) {
        this.model = nextValue;
        this.modelChange.emit(nextValue);
        this.controlChange(nextValue);
        this.updateStyles();
    }
    /**
     * @return {?}
     */
    updateStyles() {
        let /** @type {?} */ baseStyle = `width: ${this.realWidth}px;`;
        const /** @type {?} */ translate = this.model ? `translate3d(${this.realWidth - 20}px, 0, 0)` : '';
        const /** @type {?} */ color = this.model ? this.activeColor : this.inactiveColor;
        const /** @type {?} */ colorStyles = `border-color: ${color}; background-color: ${color};`;
        this.iconTransform = this.sanitizer.bypassSecurityTrustStyle(`transform: ${translate}`);
        if (this.activeColor && this.inactiveColor) {
            baseStyle += colorStyles;
        }
        this.coreStyles = this.sanitizer.bypassSecurityTrustStyle(baseStyle);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.realWidth = this.width ? this.width : 40;
        this.updateStyles();
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
ElSwitch.decorators = [
    { type: Component, args: [{
                selector: 'el-switch',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElSwitch),
                        multi: true
                    }],
                template: `
    <label class="el-switch"
      [class.is-disabled]="disabled"
      [class.el-switch--wide]="hasText"
      [class.is-checked]="model">
      <div class="el-switch__mask" *ngIf="disabled"></div>
      <input class="el-switch__input" type="checkbox"
        [name]="name" [disabled]="disabled"
        [ngModel]="model" (ngModelChange)="changeHandle($event)">
      
      <div class="el-switch__label el-switch__label--left" [class.is-active]="!model"
        *ngIf="inactiveText || inactiveIconClass">
        <i [class]="inactiveIconClass" *ngIf="inactiveIconClass"></i>
        <span *ngIf="!inactiveIconClass">{{ inactiveText }}</span>
      </div>

      <span class="el-switch__core" [style]="coreStyles">
        <span class="el-switch__button" [style]="iconTransform"></span>
      </span>

      <div class="el-switch__label el-switch__label--right" [class.is-active]="model"
           *ngIf="activeText || activeIconClass">
        <i [class]="activeIconClass" *ngIf="activeIconClass"></i>
        <span *ngIf="!activeIconClass">{{ activeText }}</span>
      </div>
    </label>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElSwitch.ctorParameters = () => [
    { type: DomSanitizer, },
];
ElSwitch.propDecorators = {
    'name': [{ type: Input },],
    'disabled': [{ type: Input },],
    'width': [{ type: Input },],
    'activeIconClass': [{ type: Input, args: ['active-icon-class',] },],
    'inactiveIconClass': [{ type: Input, args: ['inactive-icon-class',] },],
    'activeText': [{ type: Input, args: ['active-text',] },],
    'inactiveText': [{ type: Input, args: ['inactive-text',] },],
    'activeColor': [{ type: Input, args: ['active-color',] },],
    'inactiveColor': [{ type: Input, args: ['inactive-color',] },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElSwitch_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSwitch.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSwitch.ctorParameters;
    /** @type {?} */
    ElSwitch.propDecorators;
    /** @type {?} */
    ElSwitch.prototype.name;
    /** @type {?} */
    ElSwitch.prototype.disabled;
    /** @type {?} */
    ElSwitch.prototype.width;
    /** @type {?} */
    ElSwitch.prototype.activeIconClass;
    /** @type {?} */
    ElSwitch.prototype.inactiveIconClass;
    /** @type {?} */
    ElSwitch.prototype.activeText;
    /** @type {?} */
    ElSwitch.prototype.inactiveText;
    /** @type {?} */
    ElSwitch.prototype.activeColor;
    /** @type {?} */
    ElSwitch.prototype.inactiveColor;
    /** @type {?} */
    ElSwitch.prototype.model;
    /** @type {?} */
    ElSwitch.prototype.modelChange;
    /** @type {?} */
    ElSwitch.prototype.hasText;
    /** @type {?} */
    ElSwitch.prototype.realWidth;
    /** @type {?} */
    ElSwitch.prototype.coreStyles;
    /** @type {?} */
    ElSwitch.prototype.iconTransform;
    /** @type {?} */
    ElSwitch.prototype.controlChange;
    /** @type {?} */
    ElSwitch.prototype.controlTouch;
    /** @type {?} */
    ElSwitch.prototype.sanitizer;
}
//# sourceMappingURL=switch.js.map