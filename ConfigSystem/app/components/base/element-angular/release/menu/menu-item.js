import { Component, Input, ElementRef, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElMenu } from './menu';
import { ElSubmenu } from './submenu';
import { isParentTag, removeNgTag } from '../shared/utils/index';
export class ElMenuItem {
    /**
     * @param {?} rootMenu
     * @param {?} subMenu
     * @param {?} sanitizer
     * @param {?} el
     */
    constructor(rootMenu, subMenu, sanitizer, el) {
        this.rootMenu = rootMenu;
        this.subMenu = subMenu;
        this.sanitizer = sanitizer;
        this.el = el;
        this.disabled = false;
        this.title = '';
        this.inSubmenu = false;
    }
    /**
     * @return {?}
     */
    clickHandle() {
        const /** @type {?} */ comRef = this.subMenu || this.rootMenu;
        comRef.selectHandle(this.index);
        const /** @type {?} */ nextBorderIndex = (this.inSubmenu && this.subMenu) ? this.subMenu.index : this.index;
        this.rootMenu.showBorderIndex = nextBorderIndex;
    }
    /**
     * @return {?}
     */
    borderColor() {
        // not show border in group
        const /** @type {?} */ dontShowBorder = this.inSubmenu && this.subMenu;
        if (dontShowBorder)
            return 'transparent';
        return this.rootMenu.showBorderIndex === this.index ?
            (this.rootMenu.activeTextColor ? this.rootMenu.activeTextColor : '')
            : 'transparent';
    }
    /**
     * @return {?}
     */
    color() {
        return this.rootMenu.model === this.index ?
            (this.rootMenu.activeTextColor ? this.rootMenu.activeTextColor : '#409eff')
            : this.rootMenu.textColor ? this.rootMenu.textColor : '#909399';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.inSubmenu = isParentTag(this.el.nativeElement, 'el-submenu');
        removeNgTag(this.el.nativeElement);
    }
}
ElMenuItem.decorators = [
    { type: Component, args: [{
                selector: 'el-menu-item',
                template: `
    <li class="el-menu-item" (click)="clickHandle()" #list
      [ngStyle]="{ paddingLeft: '20px',
      backgroundColor: rootMenu.backgroundColor || '',
      borderBottomColor: borderColor(),
      color: color() }"
      (mouseenter)="list.style.backgroundColor = rootMenu.hoverBackgroundColor()"
      (mouseleave)="list.style.backgroundColor = rootMenu.backgroundColor || ''"
      [class.is-active]="rootMenu.model === index"
      [class.is-disabled]="disabled">
      <ng-content></ng-content>
    </li>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElMenuItem.ctorParameters = () => [
    { type: ElMenu, decorators: [{ type: Optional },] },
    { type: ElSubmenu, decorators: [{ type: Optional },] },
    { type: DomSanitizer, },
    { type: ElementRef, },
];
ElMenuItem.propDecorators = {
    'index': [{ type: Input },],
    'disabled': [{ type: Input },],
    'title': [{ type: Input },],
};
function ElMenuItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMenuItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMenuItem.ctorParameters;
    /** @type {?} */
    ElMenuItem.propDecorators;
    /** @type {?} */
    ElMenuItem.prototype.index;
    /** @type {?} */
    ElMenuItem.prototype.disabled;
    /** @type {?} */
    ElMenuItem.prototype.title;
    /** @type {?} */
    ElMenuItem.prototype.inSubmenu;
    /** @type {?} */
    ElMenuItem.prototype.rootMenu;
    /** @type {?} */
    ElMenuItem.prototype.subMenu;
    /** @type {?} */
    ElMenuItem.prototype.sanitizer;
    /** @type {?} */
    ElMenuItem.prototype.el;
}
//# sourceMappingURL=menu-item.js.map