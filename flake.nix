{
  description = "Laravel Inertia shadcn registry static export";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      self,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.buildNpmPackage {
          pname = "laravel-inertia-shadcn-registry";
          version = "0.1.0";

          src = ./.;

          npmDepsHash = "sha256-HP04PqQvzQHZx0GtmImEaF473KH+Mjxc/x8PvgWX5LU=";

          env = {
            NEXT_TELEMETRY_DISABLED = "1";
          };

          buildPhase = ''
            runHook preBuild
            npm run build
            runHook postBuild
          '';

          installPhase = ''
            runHook preInstall
            cp -r out $out
            runHook postInstall
          '';
        };
        packages.registry = self.packages."${system}".default;
      }
    );
}
