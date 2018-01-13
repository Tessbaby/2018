import { Component, Input, Output, EventEmitter, ElementRef, Optional, ViewChild, forwardRef, } from '@angular/core';
import { ElCheckboxGroup } from './checkbox-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElCheckbox {
    /**
     * @param {?} hostGroup
     * @param {?} el
     */
    constructor(hostGroup, el) {
        this.hostGroup = hostGroup;
        this.el = el;
        this.disabled = false;
        this.indeterminate = false;
        this.checked = false;
        this.modelChange = new EventEmitter();
        this.parentIsGroup = false;
        this.isFocus = false;
        this.showLabel = false;
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @return {?}
     */
    isChecked() {
        if (this.parentIsGroup) {
            return this.hostGroup.model.indexOf(this.label) > -1;
        }
        return this.model;
    }
    /**
     * @param {?} t
     * @return {?}
     */
    changeHandle(t) {
        if (this.parentIsGroup) {
            return this.hostGroup.updateModelFromChildren(t, this.label);
        }
        this.model = t;
        this.checked = this.isChecked();
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ nativeElement = this.el.nativeElement;
        this.parentIsGroup = isParentTag(nativeElement, 'el-checkbox-group');
        removeNgTag(nativeElement);
        // update model from group
        if (this.parentIsGroup) {
            this.labels = this.hostGroup.model;
            this.model = this.isChecked();
            // update handle
            this.hostGroup.subscriber.push(() => {
                this.model = this.isChecked();
                this.checked = this.isChecked();
            });
        }
        this.checked = this.isChecked();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!changes || !changes.model)
            return;
        if (changes.model.isFirstChange())
            return;
        this.changeHandle(this.model);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ contentText = this.content && this.content.nativeElement.innerText;
        setTimeout(() => {
            this.showLabel = !contentText || contentText.length < 1;
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
ElCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'el-checkbox',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElCheckbox),
                        multi: true
                    }],
                template: `
    <label class="el-checkbox">
    <span class="el-checkbox__input"
      [class.is-disabled]="disabled" [class.is-focus]="isFocus"
      [class.is-indeterminate]="indeterminate" [class.is-checked]="checked">
      <span class="el-checkbox__inner"></span>
      <input class="el-checkbox__original" type="checkbox"
        [disabled]="disabled" [value]="label" [name]="name"
        [ngModel]="model" (ngModelChange)="changeHandle($event)"
        (focus)="isFocus = true" (blur)="isFocus = false">
    </span>
    <span class="el-checkbox__label" style="padding-left: 6px;">
      <ng-container *ngIf="showLabel">{{label}}</ng-container>
      <span *ngIf="!showLabel" #content>
        <ng-content></ng-content>
      </span>
    </span>
    </label>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElCheckbox.ctorParameters = () => [
    { type: ElCheckboxGroup, decorators: [{ type: Optional },] },
    { type: ElementRef, },
];
ElCheckbox.propDecorators = {
    'content': [{ type: ViewChild, args: ['content',] },],
    'label': [{ type: Input },],
    'model': [{ type: Input },],
    'disabled': [{ type: Input },],
    'indeterminate': [{ type: Input },],
    'checked': [{ type: Input },],
    'name': [{ type: Input },],
    'trueLabel': [{ type: Input, args: ['true-label',] },],
    'modelChange': [{ type: Output },],
};
function ElCheckbox_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCheckbox.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCheckbox.ctorParameters;
    /** @type {?} */
    ElCheckbox.propDecorators;
    /** @type {?} */
    ElCheckbox.prototype.content;
    /** @type {?} */
    ElCheckbox.prototype.label;
    /** @type {?} */
    ElCheckbox.prototype.model;
    /** @type {?} */
    ElCheckbox.prototype.disabled;
    /** @type {?} */
    ElCheckbox.prototype.indeterminate;
    /** @type {?} */
    ElCheckbox.prototype.checked;
    /** @type {?} */
    ElCheckbox.prototype.name;
    /** @type {?} */
    ElCheckbox.prototype.trueLabel;
    /** @type {?} */
    ElCheckbox.prototype.modelChange;
    /** @type {?} */
    ElCheckbox.prototype.labels;
    /** @type {?} */
    ElCheckbox.prototype.parentIsGroup;
    /** @type {?} */
    ElCheckbox.prototype.isFocus;
    /** @type {?} */
    ElCheckbox.prototype.showLabel;
    /** @type {?} */
    ElCheckbox.prototype.controlChange;
    /** @type {?} */
    ElCheckbox.prototype.controlTouch;
    /** @type {?} */
    ElCheckbox.prototype.hostGroup;
    /** @type {?} */
    ElCheckbox.prototype.el;
}
//# sourceMappingURL=checkbox.js.map