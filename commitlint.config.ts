import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  rules: {
    "header-case": [2, "always", "lower-case"],
    "scope-empty": [2, "always"],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "test", "refactor", "chore"],
    ],
  },
};

export default config;
