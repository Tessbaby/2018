import { Component, ContentChild, ElementRef, forwardRef, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElInputPoprs } from './input-props';
import { getTextareaHeight } from './help';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isParentTag } from '../shared/utils/index';
import { ElFormItem } from '../form/form-item';
export class ElInput extends ElInputPoprs {
    /**
     * @param {?} sanitizer
     * @param {?} el
     * @param {?} form
     */
    constructor(sanitizer, el, form) {
        super();
        this.sanitizer = sanitizer;
        this.el = el;
        this.form = form;
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @return {?}
     */
    makeTextareaStyles() {
        if (!this.autosize || this.type !== 'textarea')
            return;
        const /** @type {?} */ height = getTextareaHeight(this.textarea.nativeElement, this.autosize.minRows, this.autosize.maxRows);
        const /** @type {?} */ styles = `resize: ${this.resize}; height: ${height};`;
        this.textareaStyles = this.sanitizer.bypassSecurityTrustStyle(styles);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    handleInput(val) {
        this.model = val;
        this.modelChange.emit(val);
        this.controlChange(val);
        const /** @type {?} */ timer = setTimeout(() => {
            this.makeTextareaStyles();
            clearTimeout(timer);
        }, 0);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // auto follow form status
        const /** @type {?} */ parentIsForm = isParentTag(this.el.nativeElement, 'el-form-item');
        if (parentIsForm) {
            const /** @type {?} */ iconStatus = {
                error: 'circle-close', success: 'circle-check', validating: 'circle-validating',
            };
            this.iconClass = 'el-input__validateIcon';
            this.form.statusSubscriber.push((status) => {
                this.icon = iconStatus[status] || '';
            });
        }
        if (this.value && !this.model) {
            this.model = this.value;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // no content required
        if (this.type === 'textarea') {
            return setTimeout(() => {
                this.makeTextareaStyles();
            }, 0);
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
ElInput.decorators = [
    { type: Component, args: [{
                selector: 'el-input',
                styles: ['.icon-disabled {cursor: not-allowed;} .icon-disabled:before {cursor: not-allowed;}'],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElInput),
                        multi: true
                    }],
                template: `
    <div [class]="(type === 'text' ? 'el-input' : 'el-textarea') +
    (size ? ' el-input--' + size : '') + ' ' + parentClass"
      [class.is-disabled]="disabled"
      [class.el-input-group]="prepend || append"
      [class.el-input-group--append]="append"
      [class.el-input-group--prepend]="prepend">
      <ng-container *ngIf="type === 'text'">
        
        <div class="el-input-group__prepend" *ngIf="prepend">
          <ng-template [ngTemplateOutlet]="prepend">
          </ng-template>
        </div>
        
        <span class="el-input__suffix" *ngIf="icon">
          <span class="el-input__suffix-inner">
            <i [class]="'el-input__icon ' + ('el-icon-' + icon) + (iconClick ? ' is-clickable ' : ' ')
              + (iconClass ? iconClass : '')"
               [attr.disabled]="disabled"
               [class.icon-disabled]="disabled"
               *ngIf="icon" (click)="iconClick.emit($event)"
               (mouseenter)="iconMouseEnter.emit($event)" (mouseleave)="iconMouseLeave.emit($event)"></i>
          </span>
        </span>
        <input class="el-input__inner"
          [autocomplete]="autoComplete" [value]="value" [name]="name" [type]="nativeType"
          [placeholder]="placeholder" [autofocus]="autofocus"
          [disabled]="disabled" [readonly]="readonly"
          [maxlength]="maxlength" [minlength]="minlength"
          [ngModel]="model" (ngModelChange)="handleInput($event)"
          (focus)="focus.emit($event)" (blur)="blur.emit($event)">
        <i *ngIf="validating" class="el-input__icon el-icon-loading"></i>
        
        <div class="el-input-group__append" *ngIf="append">
          <ng-template [ngTemplateOutlet]="append">
          </ng-template>
        </div>
      </ng-container>
      
      <ng-container *ngIf="type === 'textarea'">
        <textarea class="el-textarea__inner" #textarea
          [style]="textareaStyles"
          [value]="value" [name]="name"
          [placeholder]="placeholder" [autofocus]="autofocus"
          [disabled]="disabled" [readonly]="readonly"
          [maxlength]="maxlength" [minlength]="minlength"
          [ngModel]="model" (input)="handleInput($event.target.value)"
          (focus)="focus.emit($event)" (blur)="blur.emit($event)"></textarea>
      </ng-container>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElInput.ctorParameters = () => [
    { type: DomSanitizer, },
    { type: ElementRef, },
    { type: ElFormItem, },
];
ElInput.propDecorators = {
    'prepend': [{ type: ContentChild, args: ['prepend',] },],
    'append': [{ type: ContentChild, args: ['append',] },],
    'textarea': [{ type: ViewChild, args: ['textarea',] },],
};
function ElInput_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInput.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElInput.ctorParameters;
    /** @type {?} */
    ElInput.propDecorators;
    /** @type {?} */
    ElInput.prototype.prepend;
    /** @type {?} */
    ElInput.prototype.append;
    /** @type {?} */
    ElInput.prototype.textarea;
    /** @type {?} */
    ElInput.prototype.textareaStyles;
    /** @type {?} */
    ElInput.prototype.controlChange;
    /** @type {?} */
    ElInput.prototype.controlTouch;
    /** @type {?} */
    ElInput.prototype.sanitizer;
    /** @type {?} */
    ElInput.prototype.el;
    /** @type {?} */
    ElInput.prototype.form;
}
//# sourceMappingURL=input.js.map