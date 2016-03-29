# Org-anizer

This Node script takes in simple Emacs org files and spits out simple Markdown
files. It does very little (just creates headers in Markdown and filters by
status), but that's all I need from it.

## Example

```bash
cat sample.org | npm start
```

Input:

        * Tasks
        ** Do some things.
        *** DONE Do the first thing.
        *** TODO Do the other thing.
        ** Do some more things.
        *** DONE Yeah, more things.

Output:

        # Tasks
        ## Do some things.
        ### *DONE* Do the first thing.
        ## Do some more things.
        ### *DONE* Yeah, more things.
