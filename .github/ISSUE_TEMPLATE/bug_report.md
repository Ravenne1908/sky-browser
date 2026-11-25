---
name: Bug report
about: Something is broken in Sky Browser
labels: ["bug"]
body:
  - type: input
    id: version
    attributes:
      label: Sky Browser version
      description: Menu → Help → About (also paste the "based on Firefox ESR" line from about:support).
      placeholder: e.g. v0.1.0 — based on Firefox ESR 153.8.0
    validations:
      required: true

  - type: input
    id: os
    attributes:
      label: Operating system
      placeholder: e.g. Windows 11 23H2 / Ubuntu 24.04
    validations:
      required: true

  - type: dropdown
    id: also-firefox
    attributes:
      label: Does the bug also happen in stock Firefox of the same version?
      description: This decides whether it's ours to fix or upstream's — please check if you can.
      options:
        - "Yes — also broken in stock Firefox"
        - "No — works in stock Firefox"
        - "Didn't check"
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: Numbered steps, starting from a fresh window if possible.
      placeholder: |
        1. Open ...
        2. Click ...
        3. See ...
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual behavior
      description: Include console errors (Ctrl+Shift+J) and screenshots if relevant.
    validations:
      required: true
