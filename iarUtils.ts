
import * as path from "path";
import * as fs from "fs";

/**
 * A collection of general utility methods coupled to the IAR toolchains.
 */
export namespace IarUtils {

    /**
     * Get all installed targets from a given Embedded Workbench installation path.
     * @param workbenchPath Path to the workbench installation folder which contains the
     *                      common folder.
     * @returns
     */
    export function getTargetsFromEwPath(workbenchPath: string): string[] {
        const folders = fs.readdirSync(workbenchPath);
        const targets: string[] = [];
        for (let i = 0; i < folders.length; i++) {
            const possibleTarget = path.basename(folders[i]);
            if (possibleTarget !== "common" && fs.statSync(path.join(workbenchPath, folders[i])).isDirectory()) {
                targets.push(possibleTarget);
            }
        }
        return targets;
    }

}