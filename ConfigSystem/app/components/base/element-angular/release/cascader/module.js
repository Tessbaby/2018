import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElInputsModule } from '../input/module';
import { ElCascader } from './cascader';
import { ElCascaderMenu } from './cascader.menu';
export class ElCascaderModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: ElCascaderModule, providers: [] };
    }
}
ElCascaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ElCascader, ElCascaderMenu],
                exports: [ElCascader, ElCascaderMenu],
                imports: [CommonModule, ElInputsModule],
                entryComponents: [ElCascader],
            },] },
];
/**
 * @nocollapse
 */
ElCascaderModule.ctorParameters = () => [];
function ElCascaderModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCascaderModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCascaderModule.ctorParameters;
}
//# sourceMappingURL=module.js.map