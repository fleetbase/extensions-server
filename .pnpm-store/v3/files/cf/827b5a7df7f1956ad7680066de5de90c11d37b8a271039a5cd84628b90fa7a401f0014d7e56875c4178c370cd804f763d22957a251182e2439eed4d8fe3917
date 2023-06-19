import { Configuration } from '../../configuration';
import { BaseCompiler } from '../base-compiler';
import { PluginsLoader } from '../plugins/plugins-loader';
export type SwcCompilerExtras = {
    watch: boolean;
    typeCheck: boolean;
};
export declare class SwcCompiler extends BaseCompiler {
    private readonly pluginMetadataGenerator;
    private readonly typeCheckerHost;
    constructor(pluginsLoader: PluginsLoader);
    run(configuration: Required<Configuration>, tsConfigPath: string, appName: string, extras: SwcCompilerExtras, onSuccess?: () => void): Promise<void>;
    private runTypeChecker;
    private runSwc;
    private loadSwcCliBinary;
    private getSwcRcFileContentIfExists;
    private deepMerge;
    private debounce;
    private watchFilesInOutDir;
}
