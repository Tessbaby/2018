import { Component, Input, Optional } from '@angular/core';
import { ElSelect } from './select';
export class ElOption {
    /**
     * @param {?} rootSelect
     */
    constructor(rootSelect) {
        this.rootSelect = rootSelect;
        this.disabled = false;
        this.rootDisabled = false;
        this.itemSelected = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickHandle(event) {
        event.stopPropagation();
        if (this.disabled || this.rootDisabled)
            return;
        this.rootSelect.changeLabel(this.label, this.value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ updateHandle = () => {
            this.itemSelected = this.value === this.rootSelect.model;
            this.itemSelected && this.rootSelect.changeLabel(this.label);
        };
        this.rootDisabled = this.rootSelect.disabled;
        updateHandle();
        this.rootSelect.subscriber.push(updateHandle);
    }
}
ElOption.decorators = [
    { type: Component, args: [{
                selector: 'el-option',
                template: `
    <li class="el-select-dropdown__item"
      [class.is-disabled]="disabled || rootDisabled"
      [class.selected]="itemSelected"
      (click)="clickHandle($event)">
      <span>{{ label }}</span>
    </li>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElOption.ctorParameters = () => [
    { type: ElSelect, decorators: [{ type: Optional },] },
];
ElOption.propDecorators = {
    'value': [{ type: Input },],
    'label': [{ type: Input },],
    'disabled': [{ type: Input },],
};
function ElOption_tsickle_Closure_declarations() {
    /** @type {?} */
    ElOption.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElOption.ctorParameters;
    /** @type {?} */
    ElOption.propDecorators;
    /** @type {?} */
    ElOption.prototype.value;
    /** @type {?} */
    ElOption.prototype.label;
    /** @type {?} */
    ElOption.prototype.disabled;
    /** @type {?} */
    ElOption.prototype.rootDisabled;
    /** @type {?} */
    ElOption.prototype.itemSelected;
    /** @type {?} */
    ElOption.prototype.rootSelect;
}
//# sourceMappingURL=option.js.map