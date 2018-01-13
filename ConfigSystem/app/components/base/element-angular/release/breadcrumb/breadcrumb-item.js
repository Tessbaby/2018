import { Component, Input, Optional, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ElBreadcrumb } from './breadcrumb';
import { Router } from '@angular/router';
import { removeNgTag } from '../shared/utils/index';
export class ElBreadcrumbItem {
    /**
     * @param {?} root
     * @param {?} router
     * @param {?} el
     */
    constructor(root, router, el) {
        this.root = root;
        this.router = router;
        this.el = el;
        this.prevent = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickHandle(event) {
        event.stopPropagation();
        this.root.itemHandle(this.to);
        if (!this.to || this.root.prevent || this.prevent)
            return;
        return this.router.navigateByUrl(this.to, this.extras);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        removeNgTag(this.el.nativeElement);
    }
}
ElBreadcrumbItem.decorators = [
    { type: Component, args: [{
                selector: 'el-breadcrumb-item',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <span class="el-breadcrumb__item">
      <span class="el-breadcrumb__inner" (click)="clickHandle($event)" ref="link" role="link">
        <ng-content></ng-content>
      </span>
      <i *ngIf="root.separatorClass" [class]="'el-breadcrumb__separator ' + root.separatorClass"></i>
      <span *ngIf="!root.separatorClass" class="el-breadcrumb__separator">{{root.separator}}</span>
    </span>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElBreadcrumbItem.ctorParameters = () => [
    { type: ElBreadcrumb, decorators: [{ type: Optional },] },
    { type: Router, },
    { type: ElementRef, },
];
ElBreadcrumbItem.propDecorators = {
    'to': [{ type: Input },],
    'prevent': [{ type: Input },],
    'extras': [{ type: Input },],
};
function ElBreadcrumbItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElBreadcrumbItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElBreadcrumbItem.ctorParameters;
    /** @type {?} */
    ElBreadcrumbItem.propDecorators;
    /** @type {?} */
    ElBreadcrumbItem.prototype.to;
    /** @type {?} */
    ElBreadcrumbItem.prototype.prevent;
    /** @type {?} */
    ElBreadcrumbItem.prototype.extras;
    /** @type {?} */
    ElBreadcrumbItem.prototype.root;
    /** @type {?} */
    ElBreadcrumbItem.prototype.router;
    /** @type {?} */
    ElBreadcrumbItem.prototype.el;
}
//# sourceMappingURL=breadcrumb-item.js.map