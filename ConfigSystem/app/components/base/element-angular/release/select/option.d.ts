import { OnInit } from '@angular/core';
import { ElSelect } from './select';
export declare class ElOption implements OnInit {
    private rootSelect;
    value: any;
    label: string | number;
    disabled: boolean;
    rootDisabled: boolean;
    itemSelected: boolean;
    constructor(rootSelect: ElSelect);
    clickHandle(event: Event): void;
    ngOnInit(): void;
}
