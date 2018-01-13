import { Component, ContentChild, ElementRef, Input, Optional } from '@angular/core';
import { ElCollapse } from './collapse';
import { dropAnimation } from '../shared/animation/index';
import { removeNgTag } from '../shared/utils/index';
export class ElCollapseItem {
    /**
     * @param {?} root
     * @param {?} el
     */
    constructor(root, el) {
        this.root = root;
        this.el = el;
        this.value = null;
    }
    /**
     * @return {?}
     */
    isActive() {
        return this.root.model.some(val => val === this.value);
    }
    /**
     * @return {?}
     */
    clickHandle() {
        if (this.value === null) {
            this.value = Math.random().toString(16).substr(2, 8);
        }
        this.root.updateModel(this.value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        removeNgTag(this.el.nativeElement);
    }
}
ElCollapseItem.decorators = [
    { type: Component, args: [{
                selector: 'el-collapse-item',
                animations: [dropAnimation],
                template: `
    <div class="el-collapse-item" [class.is-active]="isActive()">
      <div role="tab" [attr.aria-expanded]="isActive">
        <div class="el-collapse-item__header" (click)="clickHandle()" role="button">
          <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
          <ng-container *ngIf="labelTmp">
            <ng-template [ngTemplateOutlet]="labelTmp">
            </ng-template>
          </ng-container>
          <ng-container *ngIf="!labelTmp">{{label}}</ng-container>
        </div>
      </div>
      
      <div class="el-collapse-item__wrap" [ngStyle]="{'border-width': isActive() ? '1px' : '0'}">
        <div class="el-collapse-item__content" [@dropAnimation]="isActive()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElCollapseItem.ctorParameters = () => [
    { type: ElCollapse, decorators: [{ type: Optional },] },
    { type: ElementRef, },
];
ElCollapseItem.propDecorators = {
    'labelTmp': [{ type: ContentChild, args: ['label',] },],
    'label': [{ type: Input },],
    'value': [{ type: Input },],
};
function ElCollapseItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCollapseItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCollapseItem.ctorParameters;
    /** @type {?} */
    ElCollapseItem.propDecorators;
    /** @type {?} */
    ElCollapseItem.prototype.labelTmp;
    /** @type {?} */
    ElCollapseItem.prototype.label;
    /** @type {?} */
    ElCollapseItem.prototype.value;
    /** @type {?} */
    ElCollapseItem.prototype.root;
    /** @type {?} */
    ElCollapseItem.prototype.el;
}
//# sourceMappingURL=collapse-item.js.map