import { EventEmitter } from '@angular/core';
export declare class ElSliderProps {
    min: number;
    max: number;
    disabled: boolean;
    showTooltip: boolean;
    formatTooltip: Function;
    vertical: boolean;
    height: number;
    model: number;
    modelChange: EventEmitter<any>;
}
