import { EventEmitter } from '@angular/core';
export declare type Option = {
    label?: string;
    value: string;
    children?: Option[];
    disabled?: boolean;
    active?: boolean;
};
export declare class ElCascaderPoprs {
    disabled: boolean;
    size: string;
    placeholder: string;
    options: Option[];
    clearable: boolean;
    allLevels: boolean;
    changeOnSelect: boolean;
    model: string[];
    modelChange: EventEmitter<any>;
}
