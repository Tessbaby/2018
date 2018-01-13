import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, } from '@angular/core';
import { removeNgTag } from '../shared/utils/index';
import { DomSanitizer } from '@angular/platform-browser';
export class ElButton {
    /**
     * @param {?} el
     * @param {?} sanitizer
     */
    constructor(el, sanitizer) {
        this.el = el;
        this.sanitizer = sanitizer;
        this.themeType = '';
        this.nativeType = 'button';
        this.size = '';
        this.icon = '';
        this.disabled = false;
        this.loading = false;
        this.plain = false;
        this.round = false;
        this.autofocus = false;
        this.style = '';
        this.nativeClass = '';
        this.click = new EventEmitter();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clickHandle($event) {
        this.click.emit($event);
    }
    /**
     * @return {?}
     */
    extendStyles() {
        return this.sanitizer.bypassSecurityTrustStyle(this.style);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        removeNgTag(this.el.nativeElement);
    }
}
ElButton.decorators = [
    { type: Component, args: [{
                selector: 'el-button',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
  <button (click)="clickHandle($event)"
    [class]="'el-button ' + (themeType ? ' el-button--' + themeType : '')
      + (size ? ' el-button--' + size : '') + ' ' + nativeClass"
    [class.is-disabled]="disabled"
    [class.is-loading]="loading"
    [class.is-plain]="plain"
    [class.is-round]="round"
    [disabled]="disabled"
    [type]="nativeType"
    [style]="extendStyles()"
    [autofocus]="autofocus">
    <i class="el-icon-loading" *ngIf="loading"></i>
    <i [class]="'el-icon-' + icon" *ngIf="icon && !loading"></i>
    <ng-content></ng-content>
  </button>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElButton.ctorParameters = () => [
    { type: ElementRef, },
    { type: DomSanitizer, },
];
ElButton.propDecorators = {
    'themeType': [{ type: Input, args: ['type',] },],
    'nativeType': [{ type: Input, args: ['native-type',] },],
    'size': [{ type: Input },],
    'icon': [{ type: Input },],
    'disabled': [{ type: Input },],
    'loading': [{ type: Input },],
    'plain': [{ type: Input },],
    'round': [{ type: Input },],
    'autofocus': [{ type: Input },],
    'style': [{ type: Input },],
    'nativeClass': [{ type: Input, args: ['class',] },],
    'click': [{ type: Output },],
};
function ElButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElButton.ctorParameters;
    /** @type {?} */
    ElButton.propDecorators;
    /** @type {?} */
    ElButton.prototype.themeType;
    /** @type {?} */
    ElButton.prototype.nativeType;
    /** @type {?} */
    ElButton.prototype.size;
    /** @type {?} */
    ElButton.prototype.icon;
    /** @type {?} */
    ElButton.prototype.disabled;
    /** @type {?} */
    ElButton.prototype.loading;
    /** @type {?} */
    ElButton.prototype.plain;
    /** @type {?} */
    ElButton.prototype.round;
    /** @type {?} */
    ElButton.prototype.autofocus;
    /** @type {?} */
    ElButton.prototype.style;
    /** @type {?} */
    ElButton.prototype.nativeClass;
    /** @type {?} */
    ElButton.prototype.click;
    /** @type {?} */
    ElButton.prototype.el;
    /** @type {?} */
    ElButton.prototype.sanitizer;
}
//# sourceMappingURL=button.js.map