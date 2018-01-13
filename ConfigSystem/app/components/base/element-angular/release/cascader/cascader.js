import { Component, forwardRef, Renderer2 } from '@angular/core';
import { ElCascaderPoprs } from './cascader-props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElCascader extends ElCascaderPoprs {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.steps = [];
        this.menuVisible = false;
        this.inputHover = false;
        this.currentLabels = [];
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickHandle(event) {
        event.stopPropagation();
        const /** @type {?} */ element = (event.target);
        const /** @type {?} */ isSelfTrigger = ['SPAN', 'I', 'INPUT'].find(v => v === element.tagName);
        if (!isSelfTrigger)
            return;
        this.menuVisible = !this.menuVisible;
        if (this.menuVisible) {
            this.globalListenFunc = this.renderer.listen('document', 'click', () => {
                this.menuVisible = false;
            });
        }
        else {
            this.globalListenFunc && this.globalListenFunc();
        }
    }
    /**
     * @return {?}
     */
    changeLabels() {
        const /** @type {?} */ nextValue = [];
        this.steps.forEach((items) => {
            const /** @type {?} */ steps = items.filter((item) => item.active);
            nextValue.push(steps[0]);
        });
        this.currentLabels = nextValue;
        const /** @type {?} */ next = nextValue.map((item) => item.value);
        this.model = next;
        this.modelChange.emit(next);
        this.controlChange(next);
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    clearValue(event) {
        event && event.stopPropagation();
        this.currentLabels = [];
        const /** @type {?} */ step1 = this.options.map((option) => Object.assign(option, {
            active: false,
        }));
        this.steps = [step1];
        this.menuVisible = false;
    }
    /**
     * @param {?} event
     * @param {?} step
     * @param {?} index
     * @return {?}
     */
    selectHandle(event, step, index) {
        event.stopPropagation();
        if (this.steps[step][index].disabled)
            return;
        this.steps[step] = this.steps[step].map((item, i) => Object.assign(item, { active: i === index }));
        // reset steps
        this.steps.length = step + 1;
        const /** @type {?} */ next = this.steps[step][index].children;
        // go next
        if (next && Array.isArray(next)) {
            // change on select (props)
            this.changeOnSelect && this.changeLabels();
            const /** @type {?} */ nativeNext = next.map((item) => Object.assign(item, { active: false }));
            return this.steps.push(nativeNext);
        }
        // last step
        this.changeLabels();
        this.menuVisible = false;
    }
    /**
     * @return {?}
     */
    showClearIcon() {
        return !!(this.clearable && this.inputHover && this.currentLabels.length);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.clearValue();
        if (this.model && this.model.length) {
            const /** @type {?} */ getLabel = (options, val) => {
                const /** @type {?} */ item = options.filter((item) => item.value === val)[0];
                return { children: item.children, val: item };
            };
            let /** @type {?} */ options = this.options;
            const /** @type {?} */ val = this.model.map(v => {
                const { children, val } = getLabel(options, v);
                options = children;
                return val;
            });
            this.currentLabels = val.filter(v => !!v);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.globalListenFunc && this.globalListenFunc();
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
ElCascader.decorators = [
    { type: Component, args: [{
                selector: 'el-cascader',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElCascader),
                        multi: true
                    }],
                template: `
    <span [class]="'el-cascader ' +  (menuVisible ? 'is-opened ' : '') + (disabled ? 'is-disabled ' : '')
      + (size ? 'el-cascader--' + size : '')"
      (click)="clickHandle($event)"
      (mouseenter)="inputHover = true" (mouseleave)="inputHover = false">
      <el-input [readonly]="true"
        [placeholder]="currentLabels.length ? '' : placeholder"
        [size]="size" [disabled]="disabled"
        [icon]="showClearIcon() ? 'circle-close' : 'caret-bottom'"
        [iconClass]="showClearIcon() ? 'el-cascader__clearIcon' : (menuVisible ? 'is-reverse' : '')"
        (icon-click)="clearValue($event)">
      </el-input>
    
      <span class="el-cascader__label" *ngIf="currentLabels.length">
        <ng-container *ngIf="allLevels">
          <ng-container *ngFor="let item of currentLabels; let i = index">
            {{ item.label }}
            <span *ngIf="i < currentLabels.length - 1"> / </span>
          </ng-container>
        </ng-container>
        <ng-container *ngIf="!allLevels">
          {{ currentLabels[currentLabels.length - 1].label }}
        </ng-container>
      </span>
      <el-cascader-menu></el-cascader-menu>
  </span>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElCascader.ctorParameters = () => [
    { type: Renderer2, },
];
function ElCascader_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCascader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCascader.ctorParameters;
    /** @type {?} */
    ElCascader.prototype.steps;
    /** @type {?} */
    ElCascader.prototype.menuVisible;
    /** @type {?} */
    ElCascader.prototype.inputHover;
    /** @type {?} */
    ElCascader.prototype.currentLabels;
    /** @type {?} */
    ElCascader.prototype.globalListenFunc;
    /** @type {?} */
    ElCascader.prototype.controlChange;
    /** @type {?} */
    ElCascader.prototype.controlTouch;
    /** @type {?} */
    ElCascader.prototype.renderer;
}
//# sourceMappingURL=cascader.js.map