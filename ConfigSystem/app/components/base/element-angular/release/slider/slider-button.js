import { Component, Input, Optional, Renderer2, Output, EventEmitter, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeAnimation } from '../shared/animation/index';
import { ElSlider } from './slider';
export class ElSliderButton {
    /**
     * @param {?} root
     * @param {?} sanitizer
     * @param {?} renderer
     */
    constructor(root, sanitizer, renderer) {
        this.root = root;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.disabled = false;
        this.model = 0;
        this.vertical = false;
        this.min = 0;
        this.max = 100;
        this.modelChange = new EventEmitter();
        this.hovering = false;
        this.dragging = false;
        this.popper = true;
        this.startPosition = 0;
        this.globalListenFunc = [];
        this.showPopper = false;
    }
    /**
     * @param {?} t
     * @return {?}
     */
    popperMouseHandle(t) {
        if (!this.dragging && !t) {
            this.showPopper = false;
        }
        if (t && !this.disabled) {
            this.showPopper = true;
        }
    }
    /**
     * @return {?}
     */
    getCurrentPosition() {
        return (this.model - this.min) / (this.max - this.min) * 100;
    }
    /**
     * @return {?}
     */
    updateWrapperStyle() {
        const /** @type {?} */ currentPosition = this.getCurrentPosition();
        const /** @type {?} */ styles = `${this.vertical ? 'bottom' : 'left'}: ${currentPosition}%`;
        this.wrapperStyles = this.sanitizer.bypassSecurityTrustStyle(styles);
    }
    /**
     * @return {?}
     */
    formatValue() {
        return this.formatTooltip ? this.formatTooltip(this.model) : this.model;
    }
    /**
     * @param {?} t
     * @return {?}
     */
    togglePopper(t) {
        this.hovering = t;
        this.popper = t;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    buttonDownHandle(event) {
        event.preventDefault();
        this.onDragStart(event);
        this.globalListenFunc.push(...[
            this.renderer.listen('window', 'mousemove', (e) => {
                this.draggingHandle(e);
            }),
            this.renderer.listen('window', 'mouseup', () => {
                this.dragEndHandle();
            })
        ]);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragStart(event) {
        // show tooltip
        this.popperMouseHandle(true);
        this.dragging = true;
        if (this.vertical) {
            this.startY = ((event)).clientY;
        }
        else {
            this.startX = ((event)).clientX;
        }
        this.startPosition = this.getCurrentPosition();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    draggingHandle(event) {
        if (!this.dragging)
            return;
        this.togglePopper(true);
        this.root.resetSize();
        let /** @type {?} */ diff = 0;
        if (this.vertical) {
            this.currentY = ((event)).clientY;
            diff = (this.startY - this.currentY) / this.root.size * 100;
        }
        else {
            this.currentX = ((event)).clientX;
            diff = (this.currentX - this.startX) / this.root.size * 100;
        }
        this.position = this.startPosition + diff;
        this.setPosition(this.position);
    }
    /**
     * @return {?}
     */
    dragEndHandle() {
        if (!this.dragging)
            return;
        // hide tooltip
        this.showPopper = false;
        const /** @type {?} */ timer = setTimeout(() => {
            this.dragging = false;
            this.togglePopper(false);
            this.setPosition(this.position);
            clearTimeout(timer);
        }, 0);
        this.globalListenFunc.forEach(func => func());
        this.globalListenFunc = [];
    }
    /**
     * @param {?} next
     * @return {?}
     */
    setPosition(next) {
        if (next === null)
            return;
        const /** @type {?} */ checkedNext = next < 0 ? 0 : next > 100 ? 100 : next;
        const /** @type {?} */ val = checkedNext * (this.max - this.min) * 0.01 + this.min;
        if (Number.isNaN(val))
            return;
        this.model = Math.round(val);
        this.modelChange.emit(this.model);
        this.updateWrapperStyle();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateWrapperStyle();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        // first change
        // if (!changes.model.previousValue) return
        this.model = changes.model.currentValue;
        this.updateWrapperStyle();
    }
}
ElSliderButton.decorators = [
    { type: Component, args: [{
                selector: 'el-slider-button',
                styles: [`
    .popper-center {
      position: absolute;
      left: 15px;
      top: -35px;
      display: none;
      transform: translateX(-50%);
    }
    .isVertical { margin-left: 2px; }
  `],
                animations: [fadeAnimation],
                template: `
    <div class="el-slider__button-wrapper"
      [class.hover]="hovering" [class.dragging]="dragging"
      [class.isVertical]="vertical"
      [style]="wrapperStyles"
      (mouseenter)="togglePopper(true)"
      (mouseleave)="togglePopper(false)"
      (mousedown)="buttonDownHandle($event)">
      <div class="el-slider__button el-tooltip" #wrapper
        (mouseenter)="popperMouseHandle(true)" (mouseleave)="popperMouseHandle(false)"></div>
      <div class="el-tooltip__popper is-dark popper-center" x-placement="top"
        [@fadeAnimation]="!showPopper">
        <div x-arrow class="popper__arrow" style="left: 50%; transform: translateX(-50%);"></div>
        <span>{{ formatValue() }}</span>
      </div>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElSliderButton.ctorParameters = () => [
    { type: ElSlider, decorators: [{ type: Optional },] },
    { type: DomSanitizer, },
    { type: Renderer2, },
];
ElSliderButton.propDecorators = {
    'disabled': [{ type: Input },],
    'model': [{ type: Input },],
    'vertical': [{ type: Input },],
    'formatTooltip': [{ type: Input, args: ['format-tooltip',] },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'modelChange': [{ type: Output },],
};
function ElSliderButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSliderButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSliderButton.ctorParameters;
    /** @type {?} */
    ElSliderButton.propDecorators;
    /** @type {?} */
    ElSliderButton.prototype.disabled;
    /** @type {?} */
    ElSliderButton.prototype.model;
    /** @type {?} */
    ElSliderButton.prototype.vertical;
    /** @type {?} */
    ElSliderButton.prototype.formatTooltip;
    /** @type {?} */
    ElSliderButton.prototype.min;
    /** @type {?} */
    ElSliderButton.prototype.max;
    /** @type {?} */
    ElSliderButton.prototype.modelChange;
    /** @type {?} */
    ElSliderButton.prototype.hovering;
    /** @type {?} */
    ElSliderButton.prototype.dragging;
    /** @type {?} */
    ElSliderButton.prototype.popper;
    /** @type {?} */
    ElSliderButton.prototype.wrapperStyles;
    /** @type {?} */
    ElSliderButton.prototype.startY;
    /** @type {?} */
    ElSliderButton.prototype.startX;
    /** @type {?} */
    ElSliderButton.prototype.currentY;
    /** @type {?} */
    ElSliderButton.prototype.currentX;
    /** @type {?} */
    ElSliderButton.prototype.startPosition;
    /** @type {?} */
    ElSliderButton.prototype.position;
    /** @type {?} */
    ElSliderButton.prototype.globalListenFunc;
    /** @type {?} */
    ElSliderButton.prototype.showPopper;
    /** @type {?} */
    ElSliderButton.prototype.root;
    /** @type {?} */
    ElSliderButton.prototype.sanitizer;
    /** @type {?} */
    ElSliderButton.prototype.renderer;
}
//# sourceMappingURL=slider-button.js.map