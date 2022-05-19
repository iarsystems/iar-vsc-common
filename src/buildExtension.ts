/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export interface ProjectConfiguration {
    name: string;
    target: string;
}

/**
 * The API exposed by the build extension, callable by other extensions. Fetch it using:
 * vscode.extensions.getExtension('extensionId').exports
 * note that this is not valid if the build extension is not activated.
 */
export interface BuildExtensionApi {
    /**
     * Gets the path to the selected workbench, if any.
     */
    getSelectedWorkbench(): Promise<string | undefined>;

    /**
     * Gets the path to the loaded project, if any.
     */
    getLoadedProject(): Promise<string | undefined>;

    /**
     * Gets the name of the selected configuration for the project.
     * If the project is not already loaded, returns undefined.
     */
    getSelectedConfiguration(project: string): Promise<ProjectConfiguration | undefined>;

    /**
     * Gets all configurations of the project.
     * If the project is not already loaded, returns undefined.
     */
    getProjectConfigurations(project: string): Promise<ProjectConfiguration[] | undefined>;

    /**
     * Gets the cspy arguments that should be used to launch a debug session for the given project and configuration.
     * NOTE: may reject if the selected workbench does not support the operation.
     * @param projectPath Path to the ewp file of the project to get the command line for
     * @param configuration Name of the configuration to get the command line for
     * @returns The cspy arguments, or undefined if the project is not loaded
     */
    getCSpyCommandline(projectPath: string, configuration: string): Promise<string[] | undefined>;

}
