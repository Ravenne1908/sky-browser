---
name: Feature request
about: Suggest something for Sky Browser
labels: ["enhancement"]
body:
  - type: textarea
    id: problem
    attributes:
      label: The problem it solves
      description: What can't you do today, or what annoys you? (A feature is only as good as the problem it solves.)
      placeholder: I'm always frustrated when ...
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: The solution you'd like
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives you've considered
      description: Including Firefox extensions/settings that already do this today.

  - type: checkboxes
    id: privacy-check
    attributes:
      label: Privacy impact check
      description: Sky Browser's identity is privacy-first — features that send data off the device need an extra-strong justification.
      options:
        - label: This feature does not require any data leaving the device
          required: false
        - label: This feature would require network requests — I've explained them above
          required: false
