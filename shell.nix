{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
    name = "prepatch";

    buildInputs = [
        pkgs.bun
    ];
}
