import { EventEmitter, Input, Output } from '@angular/core';
export class ElRateProps {
    constructor() {
        this.max = 5;
        this.disabled = false;
        // color and class
        this.colors = ['#F7BA2A', '#F7BA2A', '#F7BA2A'];
        this.voidColor = '#C6D1DE';
        this.iconClasses = ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'];
        this.voidIconClass = 'el-icon-star-off';
        this.disabledVoidColor = '#EFF2F7';
        this.disabledVoidIconClass = 'el-icon-star-on';
        // @Input('allow-half') allowHalf: boolean = false
        this.lowThreshold = 2;
        this.highThreshold = 4;
        // show text
        this.showText = false;
        this.textColor = '#1F2D3D';
        this.texts = ['极差', '失望', '一般', '满意', '惊喜'];
        // bind value
        this.model = 0;
        this.modelChange = new EventEmitter();
    }
}
ElRateProps.propDecorators = {
    'max': [{ type: Input },],
    'disabled': [{ type: Input },],
    'colors': [{ type: Input },],
    'voidColor': [{ type: Input, args: ['void-color',] },],
    'iconClasses': [{ type: Input, args: ['icon-classes',] },],
    'voidIconClass': [{ type: Input, args: ['void-icon-class',] },],
    'disabledVoidColor': [{ type: Input, args: ['disabled-void-color',] },],
    'disabledVoidIconClass': [{ type: Input, args: ['disabled-void-icon-class',] },],
    'lowThreshold': [{ type: Input, args: ['low-threshold',] },],
    'highThreshold': [{ type: Input, args: ['high-threshold',] },],
    'showText': [{ type: Input, args: ['show-text',] },],
    'textColor': [{ type: Input, args: ['text-color',] },],
    'texts': [{ type: Input },],
    'model': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElRateProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRateProps.propDecorators;
    /** @type {?} */
    ElRateProps.prototype.max;
    /** @type {?} */
    ElRateProps.prototype.disabled;
    /** @type {?} */
    ElRateProps.prototype.colors;
    /** @type {?} */
    ElRateProps.prototype.voidColor;
    /** @type {?} */
    ElRateProps.prototype.iconClasses;
    /** @type {?} */
    ElRateProps.prototype.voidIconClass;
    /** @type {?} */
    ElRateProps.prototype.disabledVoidColor;
    /** @type {?} */
    ElRateProps.prototype.disabledVoidIconClass;
    /** @type {?} */
    ElRateProps.prototype.lowThreshold;
    /** @type {?} */
    ElRateProps.prototype.highThreshold;
    /** @type {?} */
    ElRateProps.prototype.showText;
    /** @type {?} */
    ElRateProps.prototype.textColor;
    /** @type {?} */
    ElRateProps.prototype.texts;
    /** @type {?} */
    ElRateProps.prototype.model;
    /** @type {?} */
    ElRateProps.prototype.modelChange;
}
//# sourceMappingURL=rate.props.js.map