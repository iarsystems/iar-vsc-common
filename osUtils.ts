
import * as os from 'os';
import * as Path from "path";
import * as fs from 'fs'

/**
 * A collection of utilities for working with OS:s.
 */
export namespace OsUtils {
    export enum OsType {
        Windows,
        Linux,
        Mac
    }
    export function detectOsType(): OsType {
        const platform = os.platform();
        switch(platform) {
            case "win32":
                return OsType.Windows;
            case "linux":
                return OsType.Linux;
            case "darwin":
                return OsType.Mac;
            default:
                console.error("Unknown platform " + platform);
                return OsType.Linux;
        }
    }

    export enum Architecture {
        x64,
        x32,
    }
    export function detectArchitecture(): Architecture {
        const arch = os.arch();
        switch(arch) {
            case "x64":
                return Architecture.x64;
            case "x32":
                return Architecture.x32;
            default:
                console.error("Unsupported architecture " + arch);
                return Architecture.x64;
        }
    }
}

/**
 * A collection of utilities to use for resolving extensions and libraries when working cross-platform.
 */
export namespace IarOsUtils{

	/**
	 *	Resolve a shared library to the active os from the target.
	 * @param workbenchPath
	 * @param targetName
	 * @param libraryBasename
	 * @returns
	 */
	export function resolveTargetLibrary(workbenchPath: string, targetName: string, libraryBasename: string){
		var libName:string = libraryBasename;
		const slPre = OsUtils.detectOsType() === OsUtils.OsType.Windows ? targetName : "lib" + targetName;
		const slExt = libraryExtension();

        if(!libName.startsWith(slPre)){
			libName = slPre + libName;
        }

		if(!libName.endsWith(slExt)){
			libName = libName + slExt;
        }

		return Path.join(workbenchPath,targetName.toLowerCase(),"bin", libName);
	}

    export function executableExtension(){
        if(OsUtils.detectOsType() === OsUtils.OsType.Windows){
            return ".exe";
        }else{
            return "";
        }
    }

    export function libraryExtension() {
		return OsUtils.detectOsType() === OsUtils.OsType.Windows ? ".dll" : ".so";
    }

}