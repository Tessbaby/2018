import { Component, EventEmitter, Input, Output } from '@angular/core';
export class ElDropdownItem {
    constructor() {
        this.selected = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        if (this.model.disabled)
            return;
        event.stopPropagation();
        this.selected.emit(this.model);
    }
}
ElDropdownItem.decorators = [
    { type: Component, args: [{
                selector: 'el-dropdown-item',
                template: `
    <li class="el-dropdown-menu__item"
    [class.is-disabled]="model.disabled"
    [class.el-dropdown-menu__item--divided]="model.divided"
    (click)="handleClick($event)">
      {{model.label}}
    </li>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElDropdownItem.ctorParameters = () => [];
ElDropdownItem.propDecorators = {
    'model': [{ type: Input },],
    'selected': [{ type: Output },],
};
function ElDropdownItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDropdownItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDropdownItem.ctorParameters;
    /** @type {?} */
    ElDropdownItem.propDecorators;
    /** @type {?} */
    ElDropdownItem.prototype.model;
    /** @type {?} */
    ElDropdownItem.prototype.selected;
}
//# sourceMappingURL=dropdown.item.js.map