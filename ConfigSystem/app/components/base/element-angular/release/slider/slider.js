import { Component, forwardRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElSliderProps } from './slider.props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElSlider extends ElSliderProps {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        super();
        this.sanitizer = sanitizer;
        this.start = 0;
        this.isDragging = false;
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @return {?}
     */
    makeRunwayStyle() {
        const /** @type {?} */ styles = this.vertical ? `height: ${this.height}px;` : '';
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    }
    /**
     * @return {?}
     */
    makeBarStyle() {
        const /** @type {?} */ val = (this.model - this.min) * 100 / (this.max - this.min);
        const /** @type {?} */ styles = this.vertical ? `height: ${val}%; bottom: ${this.start}%;`
            : `width: ${val}%; left: ${this.start}%;`;
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    }
    /**
     * @return {?}
     */
    resetSize() {
        if (!this.runwayElement)
            return;
        this.size = this.runwayElement.nativeElement[`client${this.vertical ? 'Height' : 'Width'}`];
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSliderClick(event) {
        if (this.disabled || this.isDragging)
            return;
        this.resetSize();
        const /** @type {?} */ val = this.vertical ? event.clientY : event.clientX;
        const { left, bottom } = this.runwayElement.nativeElement.getBoundingClientRect();
        const /** @type {?} */ offset = Math.abs(val - (this.vertical ? bottom : left));
        // update value
        this.model = Math.round((offset / this.size) * (this.max - this.min)) + this.min;
        this.makeBarStyle();
    }
    /**
     * @param {?} nextValue
     * @return {?}
     */
    moveChange(nextValue) {
        this.model = nextValue;
        this.modelChange.emit(nextValue);
        this.controlChange(nextValue);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.model) {
            this.model = this.min;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.resetSize();
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
ElSlider.decorators = [
    { type: Component, args: [{
                selector: 'el-slider',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElSlider),
                        multi: true
                    }],
                template: `
    <div class="el-slider" [class.is-vertical]="vertical">
      <div class="el-slider__runway" [class.disabled]="disabled"
        [style]="makeRunwayStyle()" (click)="onSliderClick($event)" #runway>
        <div class="el-slider__bar" [style]="makeBarStyle()"></div>
        <el-slider-button [vertical]="vertical"
          [model]="model"
          (modelChange)="moveChange($event)"
          [min]="min" [max]="max"
          [format-tooltip]="formatTooltip"
          [disabled]="!showTooltip">
        </el-slider-button>
      </div>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElSlider.ctorParameters = () => [
    { type: DomSanitizer, },
];
ElSlider.propDecorators = {
    'runwayElement': [{ type: ViewChild, args: ['runway',] },],
};
function ElSlider_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSlider.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSlider.ctorParameters;
    /** @type {?} */
    ElSlider.propDecorators;
    /** @type {?} */
    ElSlider.prototype.runwayElement;
    /** @type {?} */
    ElSlider.prototype.size;
    /** @type {?} */
    ElSlider.prototype.start;
    /** @type {?} */
    ElSlider.prototype.isDragging;
    /** @type {?} */
    ElSlider.prototype.controlChange;
    /** @type {?} */
    ElSlider.prototype.controlTouch;
    /** @type {?} */
    ElSlider.prototype.sanitizer;
}
//# sourceMappingURL=slider.js.map