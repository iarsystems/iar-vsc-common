
import * as path from 'path'
import * as fs from 'fs'

/**
 * A collection of general utility methods coupled to the IAR toolchains.
 */
 export namespace IarUtils{

    /**
     * Get all installed targets from a given Embedded Workbench installation path.
     * @param workbenchPath Path to the workbench installation folder which contains the
     *                      common folder.
     * @returns
     */
    export function getTargetsFromEwPath(workbenchPath: string) : string[]{
        var folders = fs.readdirSync(workbenchPath);
        var targets:string[] = [];
        for(var i = 0; i < folders.length; i++){
            var possibleTarget = path.basename(folders[i]);
            if(possibleTarget !== "common"){
                targets.push(possibleTarget);
            }
        }
        return targets;
    }

}