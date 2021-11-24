
import * as os from "os";
import * as Path from "path";
import * as fs from "fs";

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
        switch (platform) {
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
        switch (arch) {
        case "x64":
            return Architecture.x64;
        case "x32":
            return Architecture.x32;
        default:
            console.error("Unsupported architecture " + arch);
            return Architecture.x64;
        }
    }

    /**
     * Checks whether two paths point to the same object.
     */
    export function pathsEqual(a: string, b: string) {
        return Path.relative(a, b) === "";
    }

    /**
     * Splits the path into it's segments. Any zero-length segments are removed
     * @param path The path to split into segments
     */
    export function splitPath(path: string): string[] {
        const firstSplit = path.split(/\\+|\/+/g);
        return firstSplit.filter(segment => segment.length > 0);
    }
}

/**
 * A collection of utilities to use for resolving extensions and libraries when working cross-platform.
 */
export namespace IarOsUtils {

    /**
     * Resolve a shared library to the active os from the target. This is done case-insensitive,
     * e.g. the "bat" lib on arm may resolve to "Armbat", "armBat", "armBAT" etc.
     * @param workbenchPath
     * @param targetName
     * @param libraryBasename
     * @returns The full path to the library (e.g. /install/dir/bin/arm/libarmPROC.so)
     */
    export function resolveTargetLibrary(workbenchPath: string, targetName: string, libraryBasename: string) {
        let libName: string = libraryBasename;

        if (!libName.startsWith(targetName)) {
            libName = targetName + libName;
        }

        const slPre = libraryPrefix();
        const slExt = libraryExtension();


        if (!libName.startsWith(slPre)) {
            libName = slPre + libName;
        }

        if (!libName.endsWith(slExt)) {
            libName = libName + slExt;
        }

        // We need to check what the library is actually called, since capitalization varies between
        // ew versions and OSs.
        const candidates = fs.readdirSync(Path.join(workbenchPath, targetName.toLowerCase(), "bin"));
        const actualLibName = candidates.find(cand => cand.toLowerCase() === libName.toLowerCase());
        if (!actualLibName) throw new Error(`Couldn't locate library '${libName}' for '${workbenchPath}'.`);
        return Path.join(workbenchPath, targetName.toLowerCase(), "bin", actualLibName);
    }

    export function executableExtension() {
        if (OsUtils.detectOsType() === OsUtils.OsType.Windows) {
            return ".exe";
        } else {
            return "";
        }
    }

    export function libraryExtension() {
        if (OsUtils.detectOsType() === OsUtils.OsType.Windows) {
            return ".dll";
        } else {
            return ".so";
        }
    }

    export function libraryPrefix() {
        if (OsUtils.detectOsType() === OsUtils.OsType.Windows) {
            return "";
        } else {
            return "lib";
        }
    }
}