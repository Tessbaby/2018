import { EventEmitter, Input, Output } from '@angular/core';
export class ElSliderProps {
    constructor() {
        this.min = 0;
        this.max = 100;
        this.disabled = false;
        // @Input('show-input') showInput: boolean = false
        // @Input('show-input-controls') showInputControls: boolean = true
        this.showTooltip = true;
        this.vertical = false;
        this.height = 200;
        // bind value
        this.model = 0;
        this.modelChange = new EventEmitter();
    }
}
ElSliderProps.propDecorators = {
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'disabled': [{ type: Input },],
    'showTooltip': [{ type: Input, args: ['show-tooltip',] },],
    'formatTooltip': [{ type: Input, args: ['format-tooltip',] },],
    'vertical': [{ type: Input },],
    'height': [{ type: Input, args: ['vertical-height',] },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElSliderProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSliderProps.propDecorators;
    /** @type {?} */
    ElSliderProps.prototype.min;
    /** @type {?} */
    ElSliderProps.prototype.max;
    /** @type {?} */
    ElSliderProps.prototype.disabled;
    /** @type {?} */
    ElSliderProps.prototype.showTooltip;
    /** @type {?} */
    ElSliderProps.prototype.formatTooltip;
    /** @type {?} */
    ElSliderProps.prototype.vertical;
    /** @type {?} */
    ElSliderProps.prototype.height;
    /** @type {?} */
    ElSliderProps.prototype.model;
    /** @type {?} */
    ElSliderProps.prototype.modelChange;
}
//# sourceMappingURL=slider.props.js.map