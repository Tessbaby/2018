import { Component, ElementRef, Renderer2, forwardRef, } from '@angular/core';
import { ElSelectPoprs } from './select-props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElSelect extends ElSelectPoprs {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        super();
        this.el = el;
        this.renderer = renderer;
        this.subscriber = [];
        this.dropdownActive = false;
        this.iconClass = 'arrow-up';
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @param {?=} isEnter
     * @return {?}
     */
    mouseHandle(isEnter = false) {
        if (!this.clearable || !this.model)
            return;
        this.iconClass = `${isEnter ? 'circle-close is-reverse' : 'arrow-up'}`;
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    toggleHandle(event) {
        if (this.disabled)
            return;
        event && event.stopPropagation();
        this.dropdownActive = !this.dropdownActive;
        const /** @type {?} */ nextClass = 'arrow-up' + (this.dropdownActive ? ' is-reverse' : '');
        this.iconClass = !this.clearable ? nextClass : this.iconClass;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clearSelected(event) {
        if (!this.clearable)
            return;
        event.stopPropagation();
        // reset icon
        this.mouseHandle(false);
        // reset selected label
        this.changeLabel(null, null);
        // reset model
        this.model = null;
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
        this.subscriber.forEach(sub => sub());
        // close dropdown menu
        this.dropdownActive = false;
    }
    /**
     * @param {?} nextLabel
     * @param {?=} nextValue
     * @return {?}
     */
    changeLabel(nextLabel, nextValue) {
        this.dropdownActive && this.toggleHandle();
        // only update label
        this.selectedLabel = nextLabel;
        if (!nextValue || this.model === nextValue)
            return;
        this.model = nextValue;
        this.modelChange.emit(nextValue);
        this.controlChange(nextValue);
        this.subscriber.forEach(sub => sub());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ timer = setTimeout(() => {
            this.selfWidth = this.el.nativeElement.getBoundingClientRect().width;
            clearTimeout(timer);
        }, 0);
        this.globalListener = this.renderer.listen('document', 'click', () => {
            this.dropdownActive && this.toggleHandle();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        if (changes.model.isFirstChange())
            return;
        // reset model
        if (!changes.model.currentValue) {
            this.selectedLabel = changes.model.currentValue;
            this.model = changes.model.currentValue;
            this.modelChange.emit(changes.model.currentValue);
            this.controlChange(this.model);
        }
        this.subscriber.forEach(sub => sub());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.globalListener && this.globalListener();
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
ElSelect.decorators = [
    { type: Component, args: [{
                selector: 'el-select',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElSelect),
                        multi: true
                    }],
                styles: ['.el-select-dropdown__list { overflow: hidden; }'],
                template: `
    <div class="el-select" (click)="toggleHandle($event)">
      <el-input [model]="selectedLabel" [placeholder]="placeholder" [icon]="iconClass"
        iconClass="el-select__caret"
        [name]="name" [size]="size" [disabled]="disabled"
        (mouseenter)="mouseHandle(true)" (mouseleave)="mouseHandle(false)"
        (icon-click)="clearSelected($event)">
      </el-input>
      <ng-container>
        <el-select-dropdown [isActived]="dropdownActive">
          <ul class="el-scrollbar__view el-select-dropdown__list">
            <ng-content></ng-content>
          </ul>
        </el-select-dropdown>
      </ng-container>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElSelect.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
function ElSelect_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSelect.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSelect.ctorParameters;
    /** @type {?} */
    ElSelect.prototype.selfWidth;
    /** @type {?} */
    ElSelect.prototype.subscriber;
    /** @type {?} */
    ElSelect.prototype.dropdownActive;
    /** @type {?} */
    ElSelect.prototype.selectedLabel;
    /** @type {?} */
    ElSelect.prototype.iconClass;
    /** @type {?} */
    ElSelect.prototype.globalListener;
    /** @type {?} */
    ElSelect.prototype.controlChange;
    /** @type {?} */
    ElSelect.prototype.controlTouch;
    /** @type {?} */
    ElSelect.prototype.el;
    /** @type {?} */
    ElSelect.prototype.renderer;
}
//# sourceMappingURL=select.js.map