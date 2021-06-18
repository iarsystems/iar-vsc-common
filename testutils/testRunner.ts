
import * as path from 'path';
import { runTests } from "vscode-test";
import { TestOptions } from "vscode-test/out/runTest";

/**
 * Construct a key:string based on the supplied options from the commandline.
 * @returns 
 */
 export function getEnvs() : any{
    let envs:any = {};
    for(let opt of process.argv.slice(2)){
        if(opt.startsWith('--')){
            let options = opt.substr(2).split('=');
            if(options.length > 1){
                envs[options[0]] = options[1];
            }else{
                envs[options[0]] = "true";
            }
        }
    }
    return envs;
}

/**
 * Run a set of tests using the vscode-runtests interface.
 * @param testPath The path to the index file to run.
 * @param additionalDirectories A directory to include in the tests.
 */
 export async function runTestsIn(relPath:string ,extensionPath:string, testPath:string, additionalDirectories: string | undefined = undefined){
    try {
        console.log("Extension from " + extensionPath);
        console.log("Running tests in " + testPath);

        let options:TestOptions = {
            extensionDevelopmentPath : path.resolve(relPath, extensionPath), 
            extensionTestsPath: path.resolve(relPath, testPath)
        };

        if(additionalDirectories){
            const additionals = path.resolve(relPath, additionalDirectories);
            options.launchArgs = [additionals];
        }

        options.extensionTestsEnv = getEnvs()

        await runTests(options);
    } catch (err) {
        console.log("Error:" + err);
    }
}
