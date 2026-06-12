export const SITE = {
  name: "Mnemo",
  domain: "https://mnemo.one",
  github: "https://github.com/onemnemo/mnemo",
  docs: "https://www.docs.mnemo.one/",
  installGuide: "https://www.docs.mnemo.one/students/installing",
  issues: "https://github.com/onemnemo/mnemo/issues/new",
  goodFirstIssues:
    "https://github.com/onemnemo/mnemo/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22",
  releases: "https://github.com/onemnemo/mnemo/releases/latest",
  codingStandard:
    "https://github.com/onemnemo/mnemo/blob/main/coding-standard.md",
  license: "https://github.com/onemnemo/mnemo/blob/main/LICENSE",
} as const;

/**
 * Release assets use version-free filenames, so the
 * /releases/latest/download/ redirect always resolves to the newest build.
 */
const DL = "https://github.com/onemnemo/mnemo/releases/latest/download";

export const DOWNLOADS = {
  windowsInstaller: `${DL}/Mnemo.Desktop-stable-win-x64-Setup.exe`,
  windowsPortable: `${DL}/Mnemo-Portable-win-x64.zip`,
  linuxX64: `${DL}/Mnemo.Desktop-stable-linux-x64.AppImage`,
  linuxArm64: `${DL}/Mnemo.Desktop-stable-linux-arm64.AppImage`,
  macArm64: `${DL}/Mnemo.Desktop-stable-osx-arm64-Setup.pkg`,
  macX64: `${DL}/Mnemo.Desktop-stable-osx-x64-Setup.pkg`,
} as const;
