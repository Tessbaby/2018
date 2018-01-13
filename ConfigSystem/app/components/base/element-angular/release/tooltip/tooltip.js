import { Component, ContentChild, ElementRef, Input, Renderer2, ViewChild, } from '@angular/core';
import { fadeAnimation } from '../shared/animation/index';
import { WindowWrapper } from '../shared/services/index';
import { getRealShape, getPositionForDir } from '../shared/utils/index';
export class ElTooltip {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} window
     */
    constructor(renderer, el, window) {
        this.renderer = renderer;
        this.el = el;
        this.window = window;
        this.disabled = false;
        this.watch = false;
        this.placement = 'bottom';
        this.effect = 'dark';
        this.visibleArrow = true;
        this.xPlacement = 'bottom';
        this.showPopper = true;
        this.cache = {};
    }
    /**
     * @param {?} hostRect
     * @param {?} selfRect
     * @return {?}
     */
    getPosition(hostRect, selfRect) {
        const /** @type {?} */ doubleConventions = this.placement.includes('-');
        const /** @type {?} */ arrowDir = doubleConventions ? this.placement.split('-')[1] : 'center';
        const /** @type {?} */ dir = doubleConventions ? this.placement.split('-')[0] : this.placement;
        const /** @type {?} */ position = getPositionForDir(hostRect, selfRect, dir, arrowDir);
        this.cache.position = position;
        this.cache.hostRect = hostRect;
    }
    /**
     * @return {?}
     */
    setPopoerPositionAndShow() {
        const { tipElement, position } = this.cache;
        const /** @type {?} */ arrowElement = tipElement.querySelector('.popper__arrow');
        this.xPlacement = position.arrowFace;
        this.renderer.setStyle(tipElement, 'left', `${position.left}px`);
        this.renderer.setStyle(tipElement, 'top', `${position.top}px`);
        // fix tipbox auto wrap
        this.renderer.setStyle(tipElement, 'width', `${this.tipElementShape.width}px`);
        this.renderer.setStyle(tipElement, 'height', `${this.tipElementShape.height}px`);
        this.renderer.setStyle(arrowElement, position.arrowDir, `${position.arrowPosition}px`);
    }
    /**
     * @param {?} host
     * @return {?}
     */
    bindEvent(host) {
        host.addEventListener('mouseenter', () => {
            if (this.disabled)
                return;
            this.setPopoerPositionAndShow();
            this.showPopper = true;
        });
        host.addEventListener('mouseleave', () => {
            this.showPopper = false;
            this.watch && this.update();
        });
    }
    /**
     * @return {?}
     */
    update() {
        const { tipElement, hostRect } = this.cache;
        this.renderer.setStyle(tipElement, 'width', 'auto');
        this.renderer.setStyle(tipElement, 'height', 'auto');
        setTimeout(() => {
            this.tipElementShape = getRealShape(tipElement);
            const /** @type {?} */ tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
            this.getPosition(hostRect, tipRect);
            this.renderer.setStyle(tipElement, 'width', `${this.tipElementShape.width}px`);
            this.renderer.setStyle(tipElement, 'height', `${this.tipElementShape.height}px`);
        }, 0);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ tipElement = this.popperContent.nativeElement;
        const /** @type {?} */ hostElement = this.el.nativeElement.children[0];
        this.bindEvent(hostElement);
        this.cache.tipElement = tipElement;
        const /** @type {?} */ timer = setTimeout(() => {
            this.tipElementShape = getRealShape(tipElement);
            const /** @type {?} */ tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
            const /** @type {?} */ hostRect = hostElement.getBoundingClientRect();
            this.getPosition(hostRect, tipRect);
            clearTimeout(timer);
        }, 0);
    }
}
ElTooltip.decorators = [
    { type: Component, args: [{
                selector: 'el-tooltip',
                template: `
    <div style="position: relative; display: inline-block;">
      <div [class]="'el-tooltip__popper is-' + effect + ' ' + popperClass"
        style="left: -20000px; top: 0; position: absolute;"
        [@fadeAnimation]="!showPopper" [attr.x-placement]="xPlacement" #popperContent>
        <div x-arrow class="popper__arrow" [hidden]="!visibleArrow"></div>
        <ng-template [ngTemplateOutlet]="tip"></ng-template>
      </div>
      <ng-content></ng-content>
    </div>
  `,
                animations: [fadeAnimation],
            },] },
];
/**
 * @nocollapse
 */
ElTooltip.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
    { type: WindowWrapper, },
];
ElTooltip.propDecorators = {
    'disabled': [{ type: Input },],
    'watch': [{ type: Input },],
    'placement': [{ type: Input },],
    'popperClass': [{ type: Input },],
    'effect': [{ type: Input },],
    'visibleArrow': [{ type: Input, args: ['visible-arrow',] },],
    'popperContent': [{ type: ViewChild, args: ['popperContent',] },],
    'tip': [{ type: ContentChild, args: ['tip',] },],
};
function ElTooltip_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTooltip.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTooltip.ctorParameters;
    /** @type {?} */
    ElTooltip.propDecorators;
    /** @type {?} */
    ElTooltip.prototype.disabled;
    /** @type {?} */
    ElTooltip.prototype.watch;
    /** @type {?} */
    ElTooltip.prototype.placement;
    /** @type {?} */
    ElTooltip.prototype.popperClass;
    /** @type {?} */
    ElTooltip.prototype.effect;
    /** @type {?} */
    ElTooltip.prototype.visibleArrow;
    /** @type {?} */
    ElTooltip.prototype.popperContent;
    /** @type {?} */
    ElTooltip.prototype.tip;
    /** @type {?} */
    ElTooltip.prototype.xPlacement;
    /** @type {?} */
    ElTooltip.prototype.showPopper;
    /** @type {?} */
    ElTooltip.prototype.cache;
    /** @type {?} */
    ElTooltip.prototype.tipElementShape;
    /** @type {?} */
    ElTooltip.prototype.renderer;
    /** @type {?} */
    ElTooltip.prototype.el;
    /** @type {?} */
    ElTooltip.prototype.window;
}
//# sourceMappingURL=tooltip.js.map