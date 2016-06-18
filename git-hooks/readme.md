## Git Hooks

A set of hooks we recomand to setup if you are aiming to work on the project.
These hooks should be placed in the ```.git/hooks``` directory.

**pre-commit** : runs before a commit is performed => generates production build and "git add" it

**pre-push** : runs before a push is performed => generates production build, generate updated documentation, "git add" it and "git commit" it w/ a generic message
