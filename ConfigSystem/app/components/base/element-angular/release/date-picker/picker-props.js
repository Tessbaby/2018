import { EventEmitter, Input, Output } from '@angular/core';
export class ElDatePickerProps {
    constructor() {
        this.readonly = false;
        this.disabled = false;
        this.editable = true;
        this.clearable = true;
        this.changeOnBlur = false;
        this.align = 'left'; // enum: left, center, right
        this.type = 'date'; // enum: year/month/date/week/datetime/datetimerange/daterange
        this.placeholder = '选择日期';
        this.format = 'yyyy-MM-dd';
        this.hiddenDay = false;
        this.panelAbsolute = true;
        this.panelIndex = 200;
        this.modelChange = new EventEmitter();
        this.clearClick = new EventEmitter();
        this.iconClick = new EventEmitter();
    }
}
ElDatePickerProps.propDecorators = {
    'readonly': [{ type: Input },],
    'disabled': [{ type: Input },],
    'editable': [{ type: Input },],
    'clearable': [{ type: Input },],
    'changeOnBlur': [{ type: Input, args: ['change-on-blur',] },],
    'size': [{ type: Input },],
    'align': [{ type: Input },],
    'type': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'format': [{ type: Input },],
    'hiddenDay': [{ type: Input, args: ['hidden-day',] },],
    'panelAbsolute': [{ type: Input, args: ['panel-absolute',] },],
    'panelIndex': [{ type: Input, args: ['panel-index',] },],
    'panelWidth': [{ type: Input, args: ['panel-width',] },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
    'clearClick': [{ type: Output, args: ['clear-click',] },],
    'iconClick': [{ type: Output, args: ['icon-click',] },],
};
function ElDatePickerProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDatePickerProps.propDecorators;
    /** @type {?} */
    ElDatePickerProps.prototype.readonly;
    /** @type {?} */
    ElDatePickerProps.prototype.disabled;
    /** @type {?} */
    ElDatePickerProps.prototype.editable;
    /** @type {?} */
    ElDatePickerProps.prototype.clearable;
    /** @type {?} */
    ElDatePickerProps.prototype.changeOnBlur;
    /** @type {?} */
    ElDatePickerProps.prototype.size;
    /** @type {?} */
    ElDatePickerProps.prototype.align;
    /** @type {?} */
    ElDatePickerProps.prototype.type;
    /** @type {?} */
    ElDatePickerProps.prototype.placeholder;
    /** @type {?} */
    ElDatePickerProps.prototype.format;
    /** @type {?} */
    ElDatePickerProps.prototype.hiddenDay;
    /** @type {?} */
    ElDatePickerProps.prototype.panelAbsolute;
    /** @type {?} */
    ElDatePickerProps.prototype.panelIndex;
    /** @type {?} */
    ElDatePickerProps.prototype.panelWidth;
    /** @type {?} */
    ElDatePickerProps.prototype.model;
    /** @type {?} */
    ElDatePickerProps.prototype.modelChange;
    /** @type {?} */
    ElDatePickerProps.prototype.clearClick;
    /** @type {?} */
    ElDatePickerProps.prototype.iconClick;
}
//# sourceMappingURL=picker-props.js.map