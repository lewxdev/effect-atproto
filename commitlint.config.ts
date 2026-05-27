import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-case": [2, "always", "lower-case"],
    "scope-empty": [2, "always"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "test", "refactor", "chore"],
    ],
  },
};

export default config;
