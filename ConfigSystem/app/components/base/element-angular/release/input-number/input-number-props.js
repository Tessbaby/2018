import { EventEmitter, Input, Output } from '@angular/core';
export class ElInputNumberPoprs {
    constructor() {
        this.min = 0;
        this.max = Number.MAX_SAFE_INTEGER;
        this.step = 1;
        this.disabled = false;
        this.controls = true;
        this.debounce = 300;
        // bind value
        this.model = '';
        this.modelChange = new EventEmitter();
    }
}
ElInputNumberPoprs.propDecorators = {
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'step': [{ type: Input },],
    'size': [{ type: Input },],
    'disabled': [{ type: Input },],
    'controls': [{ type: Input },],
    'debounce': [{ type: Input },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElInputNumberPoprs_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInputNumberPoprs.propDecorators;
    /** @type {?} */
    ElInputNumberPoprs.prototype.min;
    /** @type {?} */
    ElInputNumberPoprs.prototype.max;
    /** @type {?} */
    ElInputNumberPoprs.prototype.step;
    /** @type {?} */
    ElInputNumberPoprs.prototype.size;
    /** @type {?} */
    ElInputNumberPoprs.prototype.disabled;
    /** @type {?} */
    ElInputNumberPoprs.prototype.controls;
    /** @type {?} */
    ElInputNumberPoprs.prototype.debounce;
    /** @type {?} */
    ElInputNumberPoprs.prototype.model;
    /** @type {?} */
    ElInputNumberPoprs.prototype.modelChange;
}
//# sourceMappingURL=input-number-props.js.map