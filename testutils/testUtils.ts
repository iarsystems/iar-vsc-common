
import * as Mocha from "mocha";
import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import * as properties from "java-properties";


/**
 * The Setup allows the user to inject workbenches into the workspace using a
 * java-properties file.
 */
export async function Setup() {
    const ewSetupFile = process.env["ew-setup-file"];
    if (ewSetupFile) {
        console.log(`Reading stages from ${ewSetupFile}`);

        const values = properties.of(ewSetupFile);

        const ewPaths: string[] = [];
        for (const key of values.getKeys()) {
            const newPath = values.get(key) as string;
            if (!ewPaths.includes(newPath)) {
                console.log("Adding " + newPath);
                ewPaths.push(newPath);
            }
        }

        // Update the set of available workbenches
        const configTarget = vscode.workspace.workspaceFolders ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
        try {
            // Set an env variable for the debug plugin to use
            process.env["ewPaths"] = JSON.stringify(ewPaths);
            // The debug plugin cannot set this, since it does not contribute this setting
            await vscode.workspace.getConfiguration("iarvsc").update("iarInstallDirectories", ewPaths, configTarget);
        } catch (e) {
        }
        console.log("EW Setup complete");
    }
}

/**
 * The mocha test promise that runs the actual test using mocha and produces the junit results.
 * @param testsRoot
 * @returns
 */
export async function getTestPromise(testsRoot: string, localTimeout = 2000): Promise<void> {
    await Setup();

    const junitFile: string = "/junit-vs-" + path.basename(testsRoot) + ".xml";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {ui: "tdd", timeout: localTimeout};
    if (process.env["junit"]) {
        console.log("Adding junit file " + junitFile);
        options.reporter = "mocha-junit-reporter";
        options.reporterOptions = {
            mochaFile: testsRoot + junitFile,
            jenkinsMode: true,
            testsuitesTitle: true, // use unique filenames so we can run the suites multiple times with different parameters
            rootSuiteTitle: process.env["rootName"]
        };
    }
    const mocha = new Mocha(options);

    return new Promise((c, e) => {
        // run all test files in this directory
        fs.readdir(testsRoot, (err, files) => {
            if (err) {
                return e(err);
            }
            files = files.filter(file => file.endsWith(".test.js"));

            // Add files to the test suite
            files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

            try {
                // Run the mocha test
                mocha.run(failures => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    } else {
                        c();
                    }
                });
            } catch (err) {
                e(err);
            }
        });
    });
}


export namespace TestUtils {

    /**
     * Replaces the $TARGET$ string in the @param testEwpFile with @param targetName
     * and produces a copy placed alongside which can be used for testing.
     * @param targetName
     * @param testEwpFile
     */
    export function patchEwpFile(targetName: string, testEwpFile: string, outputFile: string): void {
        let fileContent: string = fs.readFileSync(testEwpFile, {encoding:"utf8"});
        fileContent = fileContent.replace("$TARGET$", targetName);
        fs.writeFileSync(outputFile, fileContent, {encoding:"utf8"});
    }

    /**
     * Recursively delete a folder and its content.
     * @param root
     */
    export function deleteDirectory(root: string) {
        fs.rmdirSync(root, {recursive: true});
    }

}
