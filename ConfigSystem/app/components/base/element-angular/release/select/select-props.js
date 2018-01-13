import { EventEmitter, Input, Output } from '@angular/core';
export class ElSelectPoprs {
    constructor() {
        this.disabled = false;
        this.clearable = false;
        this.placeholder = '请选择';
        // bind value
        this.model = '';
        this.modelChange = new EventEmitter();
    }
}
ElSelectPoprs.propDecorators = {
    'disabled': [{ type: Input },],
    'clearable': [{ type: Input },],
    'name': [{ type: Input },],
    'size': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'popperClass': [{ type: Input, args: ['popper-class',] },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElSelectPoprs_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSelectPoprs.propDecorators;
    /** @type {?} */
    ElSelectPoprs.prototype.disabled;
    /** @type {?} */
    ElSelectPoprs.prototype.clearable;
    /** @type {?} */
    ElSelectPoprs.prototype.name;
    /** @type {?} */
    ElSelectPoprs.prototype.size;
    /** @type {?} */
    ElSelectPoprs.prototype.placeholder;
    /** @type {?} */
    ElSelectPoprs.prototype.popperClass;
    /** @type {?} */
    ElSelectPoprs.prototype.model;
    /** @type {?} */
    ElSelectPoprs.prototype.modelChange;
}
//# sourceMappingURL=select-props.js.map