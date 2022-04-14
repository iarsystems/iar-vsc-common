# iar-vsc-common

This package contains code that is shared between the two IAR VS Code extensions.

The `src/thrift/bindings` directory contains automatically generated thrift code, and should not be edited manually.


This package is not meant to be published to a package registry; rather, it should be used by adding a `package.json`
dependency on this repository:
```json
"dependencies": {
    ...
    "iar-vsc-common": "git@github.com:IARSystems/iar-vsc-common.git#<commit-hash>"
}
```
The typescript source code is transpiled on installation. Thus, pushing to the `src`
directory of this repository *is* publishing.


For development, it is practical to use a local version of this repository. Simply clone this repository next to the extension repositories, then change
the `package.json` dependency for each extension to point to the new clone:
```json
"dependencies": {
    ...
    "iar-vsc-common": "file:../iar-vsc-common"
}
```
When you've finished, do not forget to change the dependency back, and update the target revision number.