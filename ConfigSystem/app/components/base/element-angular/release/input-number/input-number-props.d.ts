import { EventEmitter } from '@angular/core';
export declare class ElInputNumberPoprs {
    min: number;
    max: number;
    step: number;
    size: string;
    disabled: boolean;
    controls: boolean;
    debounce: number;
    model: any;
    modelChange: EventEmitter<number>;
}
