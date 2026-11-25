# Changelog

All notable changes to Sky Browser will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Sky Browser does not have a stable versioning scheme yet; until v0.1 ships,
entries appear under `[Unreleased]`.

Every release entry must state the upstream Firefox ESR tag it is built from
(see [`upstream.env`](upstream.env)).

## [Unreleased]

### Added

- Initial project scaffolding:
  - build scripts pinning Firefox ESR 153.8.0 (`FIREFOX_153_8_0esr_RELEASE`)
    from the official Mozilla Git repository;
  - patch-series tooling (`patches/series`, apply/create scripts);
  - privacy-hardened default preferences (`prefs/sky-browser.js`);
  - Sky Browser logo and identity placeholders, branding roadmap;
  - documentation: build guides (Linux/Windows), branding & trademark
    compliance, release process, architecture decision records;
  - GitHub project files: CI workflow, release-build workflow (self-hosted),
    issue/PR templates, security policy, code of conduct, license (MPL-2.0).
