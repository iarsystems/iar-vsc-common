
import * as path from "path";
import * as cp from "child_process";
import { downloadAndUnzipVSCode, resolveCliPathFromVSCodeExecutablePath, runTests } from "vscode-test";
import { TestOptions } from "vscode-test/out/runTest";

/**
 * Run a set of tests using the vscode-runtests interface.
 * @param relPath The path from which to resolve the other path parameters (if they are relative).
 * @param extensionPath The path to the extension root, containing the package.json file. This is the extension that will be loaded in the test window.
 * @param testPath The path to the index file to run.
 * @param envVars Environment variables to pass to the test process. Since tests are run in a separate process, this is the easiest way to pass parameters to them.
 * @param workspaceDirectory A directory to open as the workspace when running the tests.
 * @param rootName A custom name for the outermost test suite. Can be used to differentiate between runs of the same test suite with different parameters.
 */
export async function runTestsIn(relPath: string, extensionPath: string, testPath: string, envVars: Record<string, string>, workspaceDirectory?: string, rootName?: string) {
    try {
        console.log("Extension from " + extensionPath);
        console.log("Running tests in " + testPath);

        const options: TestOptions = {
            extensionDevelopmentPath: path.resolve(relPath, extensionPath),
            extensionTestsPath: path.resolve(relPath, testPath),
            launchArgs: ["--disable-workspace-trust"] // our extensions do not work with untrusted workspaces
        };

        if (workspaceDirectory) {
            const additionals = path.resolve(relPath, workspaceDirectory);
            options.launchArgs?.push(additionals);
        }

        // Install the C/C++ extension from Microsoft which is a hard requirement.
        options.extensionTestsEnv = envVars;
        options.extensionTestsEnv["rootName"] = rootName;

        const vscodeExecutablePath = await downloadAndUnzipVSCode("insiders");
        options.vscodeExecutablePath = vscodeExecutablePath;
        const cliPath = resolveCliPathFromVSCodeExecutablePath(vscodeExecutablePath);

        // Install the C/C++ extension from Microsoft which is a hard requirement.
        const extensions = ["ms-vscode.cpptools", "ms-vscode.vscode-embedded-tools"];
        // Use cp.spawn / cp.exec for custom setup
        extensions.forEach(extension => {
            console.log("Installing " + extension);

            cp.spawnSync(cliPath, ["--install-extension", extension], {
                encoding: "utf-8",
                stdio: "inherit"
            });
        });

        console.log("Starting vs code with the following envVars: ", options.extensionTestsEnv);
        await runTests(options);
    } catch (err) {
        console.log("Error:" + err);
    }
}
