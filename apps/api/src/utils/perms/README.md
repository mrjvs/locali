# The permission system

To make sure permissions are properly implemented, the system is kept very simple.

## The syntax

```sh
# General syntax of a permission:
# An asterisk can be used to indicate that any ID or ACTION can be used.
<ACTION>:/resource/<ID>/sub-resource/<ID>

# a few examples
# -----------------------

# action CREATE an organistion
CREATE:/organisation

# action DELETE any project
DELETE:/organisation/*/project/*

# any action on any project from organisation "abc"
*:/organisation/abc/project/*
```

