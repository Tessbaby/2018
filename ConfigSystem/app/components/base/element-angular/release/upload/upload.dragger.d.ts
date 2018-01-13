import { EventEmitter } from '@angular/core';
export declare class ElUploadDragger {
    disabled: boolean;
    change: EventEmitter<any>;
    dragger: boolean;
    dragoverHandle(event: Event): void;
    dragLeaveHandle(event: Event): void;
    dropHandle(event: DragEvent): void;
}
