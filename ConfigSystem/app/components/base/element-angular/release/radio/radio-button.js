import { Component, Input, Output, EventEmitter, Optional, ElementRef, } from '@angular/core';
import { ElRadioGroup } from './radio-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
export class ElRadioButton {
    /**
     * @param {?} rootGroup
     * @param {?} el
     */
    constructor(rootGroup, el) {
        this.rootGroup = rootGroup;
        this.el = el;
        this.disabled = false;
        this.nativeName = '';
        this.modelChange = new EventEmitter();
        this.showLabel = false;
        this.parentIsGroup = false;
    }
    /**
     * @return {?}
     */
    changeHandle() {
        if (this.parentIsGroup) {
            return this.rootGroup.changeHandle(this.label);
        }
        this.modelChange.emit(this.label);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ nativeElement = this.el.nativeElement;
        const /** @type {?} */ update = () => {
            this.disabled = this.rootGroup.disabled;
            this.model = this.rootGroup.model;
            this.size = this.rootGroup.buttonSize;
            this.activeStyles = {
                backgroundColor: this.rootGroup.fillColor || '',
                borderColor: this.rootGroup.fillColor || '',
                boxShadow: this.rootGroup.fillColor ? `-1px 0 0 0 ${this.rootGroup.fillColor}` : '',
                color: this.rootGroup.textColor || '',
            };
        };
        this.parentIsGroup = isParentTag(nativeElement, 'el-radio-group');
        removeNgTag(nativeElement);
        if (this.parentIsGroup && this.rootGroup) {
            update();
            this.rootGroup.subscriber.push(update);
        }
    }
}
ElRadioButton.decorators = [
    { type: Component, args: [{
                selector: 'el-radio-button',
                template: `
    <label [class]="'el-radio-button' + (size ? ' el-radio-button--' + size : '')"
      [class.is-disabled]="disabled"
      [class.is-active]="model === label">
      <input class="el-radio-button__orig-radio" type="radio"
        [value]="label" [name]="nativeName" [disabled]="disabled"
        [ngModel]="model" (ngModelChange)="changeHandle()">
      <span class="el-radio-button__inner" [ngStyle]="model === label && activeStyles">
        <ng-content></ng-content>
      </span>
    </label>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElRadioButton.ctorParameters = () => [
    { type: ElRadioGroup, decorators: [{ type: Optional },] },
    { type: ElementRef, },
];
ElRadioButton.propDecorators = {
    'disabled': [{ type: Input },],
    'label': [{ type: Input },],
    'nativeName': [{ type: Input, args: ['name',] },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElRadioButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRadioButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRadioButton.ctorParameters;
    /** @type {?} */
    ElRadioButton.propDecorators;
    /** @type {?} */
    ElRadioButton.prototype.disabled;
    /** @type {?} */
    ElRadioButton.prototype.label;
    /** @type {?} */
    ElRadioButton.prototype.nativeName;
    /** @type {?} */
    ElRadioButton.prototype.model;
    /** @type {?} */
    ElRadioButton.prototype.modelChange;
    /** @type {?} */
    ElRadioButton.prototype.size;
    /** @type {?} */
    ElRadioButton.prototype.showLabel;
    /** @type {?} */
    ElRadioButton.prototype.parentIsGroup;
    /** @type {?} */
    ElRadioButton.prototype.activeStyles;
    /** @type {?} */
    ElRadioButton.prototype.rootGroup;
    /** @type {?} */
    ElRadioButton.prototype.el;
}
//# sourceMappingURL=radio-button.js.map