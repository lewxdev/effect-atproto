status=0

git config core.hooksPath .githooks || status=$?
effect-language-service patch --log-level warn || status=$?

exit "$status"
