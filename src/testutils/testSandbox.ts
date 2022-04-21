

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
        console.log("Copying ", toCopy);
        newName = newName ?? Path.basename(toCopy);

        const targetPath = Path.join(this.sandboxRoot, newName);
        if (Fs.statSync(toCopy).isFile()) {
            Fs.copyFileSync(toCopy, targetPath);
        } else {
            if (Fs.existsSync(targetPath)) {
                // Remove old contents (e.g. from previous test runs).
                // Removing the entire directory can break the .ewp file watcher,
                // so this only removes each of the items *in* the directory.
                //
                // Also note that we don't remove .ewp files. The .ewp file watcher sometimes won't catch if we delete
                // and then quickly recreate a .ewp file, so just leave them be; they will be overwritten when we do the
                // copying anyway.
                TestSandbox.removeRecursive(targetPath, path => !path.endsWith(".ewp"));
            }
            TestSandbox.copyDirectory(toCopy, targetPath);
        }
        return targetPath;
    }

    /**
     * Removes the sandbox folder (and all files in it)
     */
    clear() {
        Fs.rmdirSync(this.sandboxRoot, {recursive: true});
    }

    get path(): string {
        return this.sandboxRoot;
    }

    private get sandboxRoot() {
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

    /**
     * Recursively removes all contents of a directory that matches the predicate.
     * Note that this does not remove the directory itself.
     *
     * @returns Whether there are any entries left in the directory.
     */
    private static removeRecursive(dir: string, predicate: (path: string) => boolean): boolean {
        let anyItemsLeft = false;
        Fs.readdirSync(dir).forEach(subItem => {
            const subItemPath = Path.join(dir, subItem);
            if (Fs.statSync(subItemPath).isDirectory()) {
                if (!this.removeRecursive(subItemPath, predicate)) {
                    Fs.unlinkSync(subItemPath);
                } else {
                    anyItemsLeft = true;
                }
            } else if (predicate(subItemPath)) {
                Fs.unlinkSync(subItemPath);
            } else {
                anyItemsLeft = true;
            }
        });
        return anyItemsLeft;
    }
}
