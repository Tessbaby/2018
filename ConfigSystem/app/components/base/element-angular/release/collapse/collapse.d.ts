import { EventEmitter } from '@angular/core';
export declare type ModelValue = string | number;
export declare class ElCollapse {
    accordion: boolean;
    model: ModelValue[];
    modelChange: EventEmitter<ModelValue[]>;
    constructor();
    updateModel(value: ModelValue): void;
}
