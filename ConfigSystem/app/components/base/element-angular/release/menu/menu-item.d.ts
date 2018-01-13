import { OnInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElMenu } from './menu';
import { ElSubmenu } from './submenu';
export declare class ElMenuItem implements OnInit {
    rootMenu: ElMenu;
    private subMenu;
    private sanitizer;
    private el;
    index: string;
    disabled: boolean;
    title: string;
    private inSubmenu;
    constructor(rootMenu: ElMenu, subMenu: ElSubmenu, sanitizer: DomSanitizer, el: ElementRef);
    clickHandle(): void;
    borderColor(): string;
    color(): string;
    ngOnInit(): void;
}
