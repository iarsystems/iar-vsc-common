

import * as Path from "path";
import * as Fs from "fs";

/**
 * Creates a "sandbox" where files or folders (typically ew projects) can be moved before each test run,
 * rather than cluttering the test/ directory with copies/backups/outputs of test projects.
 * The sandbox can be removed afterwards, or kept for traceability.
 */
export class TestSandbox {
    private static readonly TMP_FOLDER_NAME = "test-sandbox";

    constructor(private readonly extensionRoot: string) {
    }

    /**
     * Copies a file or folder to the sandbox.
     * @param toMove Path to the object to copy
     * @param newName The name to give the object after moving it. Omit to use the same name
     * @returns The path to the object's copy in the sandbox
     */
    copyToSandbox(toCopy: string, newName?: string): string {
        if (newName === undefined) {
            newName = Path.basename(toCopy);
        }

        const targetPath = Path.join(this.sandBoxRoot, newName);
        if (Fs.statSync(toCopy).isFile()) {
            Fs.copyFileSync(toCopy, targetPath);
        } else {
            TestSandbox.copyDirectory(toCopy, targetPath);
        }
        return targetPath;
    }

    /**
     * Removes the sandbox folder (and all files in it)
     */
    clear() {
        Fs.rmdirSync(this.sandBoxRoot, {recursive: true});
    }

    private get sandBoxRoot() {
        return Path.join(this.extensionRoot, TestSandbox.TMP_FOLDER_NAME);
    }

    // Can be replaced by fs.promises.cp when it is stable
    private static copyDirectory(src: string, dest: string) {
        Fs.mkdirSync(dest, { recursive: true });

        Fs.readdirSync(src, { withFileTypes: true }).forEach((entry) => {
            const sourcePath = Path.join(src, entry.name);
            const destinationPath = Path.join(dest, entry.name);

            entry.isDirectory()
                ? TestSandbox.copyDirectory(sourcePath, destinationPath)
                : Fs.copyFileSync(sourcePath, destinationPath);
        });
    }
}