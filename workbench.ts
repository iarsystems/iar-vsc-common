/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



import { spawnSync } from "child_process";
import * as Fs from "fs";
import * as Path from "path";
import { IarOsUtils, OsUtils } from "./osUtils";


/**
 * An IAR toolchain (Embedded Workbench or Build Tools). To the user, this is refered to as a toolchain.
 * Note that they are not the related to the thrift Toolchain type.
 */
export interface Workbench {
    readonly name: string;
    readonly path: string;
    /** The path to iaridepm */
    readonly idePath: string;
    /** The path to iarbuild */
    readonly builderPath: string;
    /** The IDE platform version */
    readonly version: WorkbenchVersion;
    /** Whether this is a full IDE or just build tools (BX) */
    readonly type: WorkbenchType;
    /** An identifier for the target (e.g. 'arm').
     *  This is the name of the folder in the workbench root containing target-specific files (e.g. the compiler) */
    readonly targetId: string | undefined;
}

export interface WorkbenchVersion { major: number, minor: number, patch: number }

export enum WorkbenchType { IDE, BX }

export namespace Workbench {
    export const ideSubPath = "common/bin/IarIdePm.exe";
    export const builderSubPath = "common/bin/iarbuild" + (OsUtils.OsType.Windows === OsUtils.detectOsType() ? ".exe" : "");

    /**
     * Create a new Workbench object and verify it.
     * @param root the root path of the Workbench. The folders *common* and *install-info* reside in the root folder.
     * @returns A Workbench instance if root points to a valid workbench, otherwise undefined
     */
    export function create(root: string): Workbench | undefined {
        if (!isValid(root)) {
            return undefined;
        }
        return new WorkbenchImpl(root);
    }

    function isValid(workbenchPath: string): boolean {
        const builderPath = Path.join(workbenchPath, Workbench.builderSubPath);

        try {
            const stat = Fs.statSync(builderPath);

            return stat.isFile();
        } catch (e) {
            return false;
        }
    }

    const targetDisplayNames: { [target: string]: string } = {
        "arm":   "ARM",
        "riscv": "RISC-V",
        "430":   "MSP430",
        "avr":   "AVR",
        "rh850": "RH850",
        "rl78":  "Renesas RL78",
        "rx":    "Renesas RX",
        "stm8":  "STM8",
    };
    /**
     * Gets the user-friendly name of a target
     */
    export function getTargetDisplayName(targetId: string): string | undefined {
        return targetDisplayNames[targetId];
    }
}

class WorkbenchImpl implements Workbench {
    private _version: WorkbenchVersion | undefined = undefined;

    readonly path: string;
    readonly idePath: string;
    readonly builderPath: string;

    /**
     * Create a new Workbench object based using a path.
     *
     * @param path The root path of the workbench. The folders *common* and
     *             *install-info* reside in the root folder.
     */
    constructor(path: string) {
        this.path = path;
        this.idePath = Path.join(this.path.toString(), Workbench.ideSubPath);
        this.builderPath = Path.join(this.path.toString(), Workbench.builderSubPath);
    }

    get name(): string {
        return Path.parse(this.path.toString()).base;
    }

    get version(): WorkbenchVersion {
        if (this._version === undefined) {
            const stdout = spawnSync(this.builderPath.toString()).stdout;
            const match = stdout.toString().match(/V(\d+)\.(\d+)\.(\d+)\.\d+/);
            if (match && match[1] !== undefined && match[2] !== undefined && match[3] !== undefined) {
                this._version = { major: parseInt(match[1]), minor: parseInt(match[2]), patch: parseInt(match[3]) };
            } else {
                this._version = { major: NaN, minor: NaN, patch: NaN };
            }
        }
        return this._version;
    }

    get type(): WorkbenchType {
        // Checks whether a workbench has CspyServer. This might misclassify really old EW version, but that's ok since we don't support them anyway.
        if (Fs.existsSync(Path.join(this.path, "common/bin/CSpyServer" + IarOsUtils.executableExtension())) ||
            Fs.existsSync(Path.join(this.path, "common/bin/CSpyServer2" + IarOsUtils.executableExtension()))) {
            return WorkbenchType.IDE;
        }
        return WorkbenchType.BX;
    }

    get targetId(): string | undefined {
        let entries = Fs.readdirSync(this.path);
        entries = entries.filter(entry => !["install-info", "common"].includes(entry)).
            filter(entry => Fs.statSync(Path.join(this.path, entry)).isDirectory);
        const target = entries[0];
        return target;
    }


}
