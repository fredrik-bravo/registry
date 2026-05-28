{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    pkgs.nodejs_24
  ];

  # https://devenv.sh/languages/
  # languages.rust.enable = true;

  # https://devenv.sh/processes/
  # processes.dev.exec = "${lib.getExe pkgs.watchexec} -n -- ls -la";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';

  # https://devenv.sh/basics/
  enterShell = ''
    hello         # Run scripts directly
    git --version # Use packages
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/git-hooks/
  # git-hooks.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/

  services.nginx = {
    enable = true;
    httpConfig = ''
      server {
        listen 8080;
        server_name localhost;

        root ${config.devenv.root}/out;
        index index.html;

        location / {
          try_files $uri $uri.html $uri/ =404;
        }

        location /_next/static/ {
          expires 1y;
          add_header Cache-Control "public, immutable";
          try_files $uri =404;
        }

        location /r/ {
          add_header Access-Control-Allow-Origin "*";
          try_files $uri =404;
        }

        error_page 404 /404.html;
        location = /404.html {
          internal;
        }
      }
    '';
  };
}
