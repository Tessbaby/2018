import { SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { ElTableSlotEvent, TableColumnDataItem } from '../table.interface';
import { ElTableFormat } from '../utils/format';
export declare class ElTableBody implements OnChanges {
    tableFormat: ElTableFormat;
    model: TableColumnDataItem[][];
    stripe: boolean;
    center: boolean;
    layout: any;
    rowClassName: (userRow: any, index: number) => string;
    cellClick: EventEmitter<ElTableSlotEvent>;
    cellDblClick: EventEmitter<ElTableSlotEvent>;
    cellMouseEnter: EventEmitter<Event>;
    cellMouseLeave: EventEmitter<Event>;
    formatModel: any[];
    constructor(tableFormat: ElTableFormat);
    merge(domHandle: any, next: any): any;
    isTemplateRef(content: any): boolean;
    getBodyWidth(): number;
    getFormatModel(index: number): any;
    destroyRowFunc(index: number): Function;
    makeRowClass(index: number): string;
    doubleClickHandle(event: Event, Ref: any): void;
    clickHandle(event: Event, Ref: any): void;
    cellMouseActionHandle(event: Event, isEnter: boolean): void;
    ngOnChanges(changes: SimpleChanges): void;
}
