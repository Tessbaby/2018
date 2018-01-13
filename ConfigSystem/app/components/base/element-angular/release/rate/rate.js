import { Component, ViewChild, Renderer2, forwardRef } from '@angular/core';
import { ElRateProps } from './rate.props';
import { DomSanitizer } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElRate extends ElRateProps {
    /**
     * @param {?} sanitizer
     * @param {?} renderer
     */
    constructor(sanitizer, renderer) {
        super();
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.scores = [];
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @param {?} __0
     * @param {?=} index
     * @param {?=} reset
     * @return {?}
     */
    hoverToggle({ srcElement }, index, reset = false) {
        if (this.disabled)
            return;
        const /** @type {?} */ iconElement = srcElement.tagName === 'I' ? srcElement : srcElement.children[0];
        if (reset) {
            this.model = this.backupModel;
            this.renderer.removeClass(iconElement, 'hover');
        }
        else {
            this.model = index;
            this.renderer.addClass(iconElement, 'hover');
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectValue(index) {
        if (this.disabled)
            return;
        this.model = this.backupModel = index;
        this.modelChange.emit(index);
        this.controlChange;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    makeIconClasses(index) {
        const /** @type {?} */ voidClass = this.disabled ? this.rateMap.disabled.class : this.rateMap.void.class;
        const /** @type {?} */ activeItem = this.findCurrentType(this.model, this.rateMap);
        const /** @type {?} */ classes = index <= this.model ? activeItem.class : voidClass;
        return 'el-rate__icon ' + classes;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    makeIconStyles(index) {
        const /** @type {?} */ voidColor = this.disabled ? this.rateMap.disabled.color : this.rateMap.void.color;
        const /** @type {?} */ activeItem = this.findCurrentType(this.model, this.rateMap);
        const /** @type {?} */ styles = `color: ${index <= this.model ? activeItem.color : voidColor};`;
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    }
    /**
     * @param {?} index
     * @param {?} rateMap
     * @return {?}
     */
    findCurrentType(index, rateMap) {
        if (index <= this.lowThreshold)
            return rateMap.low;
        if (index >= this.highThreshold)
            return rateMap.high;
        return rateMap.medium;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.scores = new Array(this.max).fill('');
        this.backupModel = this.model;
        this.rateMap = {
            low: { color: this.colors[0], class: this.iconClasses[0] },
            medium: { color: this.colors[1], class: this.iconClasses[1] },
            high: { color: this.colors[2], class: this.iconClasses[2] },
            void: { color: this.voidColor, class: this.voidIconClass },
            disabled: { color: this.disabledVoidColor, class: this.disabledVoidIconClass },
        };
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
ElRate.decorators = [
    { type: Component, args: [{
                selector: 'el-rate',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElRate),
                        multi: true
                    }],
                template: `
    <div class="el-rate" role="slider">
      <span *ngFor="let s of scores; let i = index" class="el-rate__item"
        [ngStyle]="{cursor: disabled ? 'auto' : 'pointer'}"
        (mousemove)="hoverToggle($event, i)"
        (mouseleave)="hoverToggle($event, i, true)"
        (click)="selectValue(i)">
        <i class="el-rate__icon" [style]="makeIconStyles(i)"
          [class]="makeIconClasses(i)"
          [class.hover]="i"
          #rateIcon></i>
      </span>
      <span *ngIf="showText" class="el-rate__text" [ngStyle]="{ color: textColor }">
        {{ texts[model] }}
      </span>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElRate.ctorParameters = () => [
    { type: DomSanitizer, },
    { type: Renderer2, },
];
ElRate.propDecorators = {
    'rateIcon': [{ type: ViewChild, args: ['rateIcon',] },],
};
function ElRate_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRate.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRate.ctorParameters;
    /** @type {?} */
    ElRate.propDecorators;
    /** @type {?} */
    ElRate.prototype.rateIcon;
    /** @type {?} */
    ElRate.prototype.scores;
    /** @type {?} */
    ElRate.prototype.rateMap;
    /** @type {?} */
    ElRate.prototype.backupModel;
    /** @type {?} */
    ElRate.prototype.controlChange;
    /** @type {?} */
    ElRate.prototype.controlTouch;
    /** @type {?} */
    ElRate.prototype.sanitizer;
    /** @type {?} */
    ElRate.prototype.renderer;
}
//# sourceMappingURL=rate.js.map