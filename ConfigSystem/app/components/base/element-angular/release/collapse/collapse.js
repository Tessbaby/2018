import { Component, EventEmitter, Input, Output } from '@angular/core';
export class ElCollapse {
    constructor() {
        this.accordion = false;
        this.model = [];
        this.modelChange = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateModel(value) {
        const /** @type {?} */ index = this.model.findIndex(val => val === value);
        if (index < 0) {
            this.accordion && (this.model = []);
            this.model.push(value);
            return this.modelChange.emit(this.model);
        }
        if (this.accordion) {
            this.model = [];
        }
        else {
            this.model.splice(index, 1);
        }
        this.modelChange.emit(this.model);
    }
}
ElCollapse.decorators = [
    { type: Component, args: [{
                selector: 'el-collapse',
                template: `
    <div class="el-collapse" role="tablist" aria-multiselectable="true">
      <ng-content></ng-content>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElCollapse.ctorParameters = () => [];
ElCollapse.propDecorators = {
    'accordion': [{ type: Input },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElCollapse_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCollapse.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCollapse.ctorParameters;
    /** @type {?} */
    ElCollapse.propDecorators;
    /** @type {?} */
    ElCollapse.prototype.accordion;
    /** @type {?} */
    ElCollapse.prototype.model;
    /** @type {?} */
    ElCollapse.prototype.modelChange;
}
//# sourceMappingURL=collapse.js.map