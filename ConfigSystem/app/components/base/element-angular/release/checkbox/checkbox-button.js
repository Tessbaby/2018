import { Component, Input, Output, EventEmitter, ElementRef, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { ElCheckboxGroup } from './checkbox-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
import { DomSanitizer } from '@angular/platform-browser';
export class ElCheckboxButton {
    /**
     * @param {?} hostGroup
     * @param {?} el
     * @param {?} domSanitizer
     */
    constructor(hostGroup, el, domSanitizer) {
        this.hostGroup = hostGroup;
        this.el = el;
        this.domSanitizer = domSanitizer;
        this.disabled = false;
        this.indeterminate = false;
        this.checked = false;
        this.modelChange = new EventEmitter();
        this.parentIsGroup = false;
        this.isFocus = false;
        this.showLabel = false;
    }
    /**
     * @return {?}
     */
    activeStyle() {
        if (!this.hostGroup)
            return this.domSanitizer.bypassSecurityTrustStyle('');
        const /** @type {?} */ styles = `backgroundColor: ${this.hostGroup.fill};` +
            `borderColor: ${this.hostGroup.fill};color: ${this.hostGroup.textColor};` +
            `box-shadow: -1px 0 0 0 ${this.hostGroup.fill};`;
        return this.domSanitizer.bypassSecurityTrustStyle(this.checked && !this.disabled ? styles : '');
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
        this.parentIsGroup && this.hostGroup.updateModelFromChildren(t, this.label);
        this.model = t;
        this.checked = this.isChecked();
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
            this.size = this.hostGroup.size;
            this.model = this.isChecked();
            // update handle
            this.hostGroup.subscriber.push(() => this.model = this.isChecked());
        }
        this.checked = this.isChecked();
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
}
ElCheckboxButton.decorators = [
    { type: Component, args: [{
                selector: 'el-checkbox-button',
                template: `
    <label [class]="'el-checkbox-button' + (size ? ' el-checkbox-button--' + size : '') "
      role="checkbox"
      [class.is-disabled]="disabled" [class.is-focus]="isFocus"
      [class.is-indeterminate]="indeterminate" [class.is-checked]="checked">
      <input class="el-checkbox-button__original" type="checkbox"
        [disabled]="disabled" [value]="label" [name]="name"
        [ngModel]="model" (ngModelChange)="changeHandle($event)"
        (focus)="isFocus = true" (blur)="isFocus = false">
      <span class="el-checkbox-button__inner"
        [style]="activeStyle()">
        <ng-container *ngIf="showLabel">{{label}}</ng-container>
        <span *ngIf="!showLabel" #content>
          <ng-content></ng-content>
        </span>
      </span>
    </label>
  `,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
ElCheckboxButton.ctorParameters = () => [
    { type: ElCheckboxGroup, decorators: [{ type: Optional },] },
    { type: ElementRef, },
    { type: DomSanitizer, },
];
ElCheckboxButton.propDecorators = {
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
function ElCheckboxButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCheckboxButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCheckboxButton.ctorParameters;
    /** @type {?} */
    ElCheckboxButton.propDecorators;
    /** @type {?} */
    ElCheckboxButton.prototype.content;
    /** @type {?} */
    ElCheckboxButton.prototype.label;
    /** @type {?} */
    ElCheckboxButton.prototype.model;
    /** @type {?} */
    ElCheckboxButton.prototype.disabled;
    /** @type {?} */
    ElCheckboxButton.prototype.indeterminate;
    /** @type {?} */
    ElCheckboxButton.prototype.checked;
    /** @type {?} */
    ElCheckboxButton.prototype.name;
    /** @type {?} */
    ElCheckboxButton.prototype.trueLabel;
    /** @type {?} */
    ElCheckboxButton.prototype.modelChange;
    /** @type {?} */
    ElCheckboxButton.prototype.labels;
    /** @type {?} */
    ElCheckboxButton.prototype.parentIsGroup;
    /** @type {?} */
    ElCheckboxButton.prototype.isFocus;
    /** @type {?} */
    ElCheckboxButton.prototype.showLabel;
    /** @type {?} */
    ElCheckboxButton.prototype.size;
    /** @type {?} */
    ElCheckboxButton.prototype.hostGroup;
    /** @type {?} */
    ElCheckboxButton.prototype.el;
    /** @type {?} */
    ElCheckboxButton.prototype.domSanitizer;
}
//# sourceMappingURL=checkbox-button.js.map