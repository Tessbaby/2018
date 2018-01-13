import { EventEmitter } from '@angular/core';
export declare class ElRateProps {
    max: number;
    disabled: boolean;
    colors: string[];
    voidColor: string;
    iconClasses: string[];
    voidIconClass: string;
    disabledVoidColor: string;
    disabledVoidIconClass: string;
    lowThreshold: number;
    highThreshold: number;
    showText: boolean;
    textColor: string;
    texts: string[];
    model: number;
    modelChange: EventEmitter<any>;
}
