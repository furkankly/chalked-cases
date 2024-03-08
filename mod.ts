/**
 * Convert strings between different cases while applying styles for terminal.
 *
 * This module uses {@link https://jsr.io/@luca/cases @luca/cases} and {@link https://www.npmjs.com/package/chalk chalk}.
 *
 * This module provides a function for converting strings between camel case,
 * snake case, kebab case, title case, pascal case, constant case. You can also use it
 * for splitting a string into pieces based on spaces, dashes, underscores, and camel case.
 *
 * You can access the api of chalk under `chalk` namespace.
 *
 * ```ts
 * import chalkedCases, { chalk } from "@furkanly/chalked-cases";
 *
 * console.log(chalkedCases("hello world", "camel", chalk.default.blue)) // "helloWorld"
 * console.log(chalkedCases("helloWorld", "snake", chalk.default.blue)) // "hello_world"
 * console.log(chalkedCases("hello_world", "kebab", chalk.default.blue)) // "hello-world"
 * console.log(chalkedCases("hello-world", "title", chalk.default.blue)) // "Hello World"
 * console.log(chalkedCases(["hello", "world"], "pascal", chalk.default.blue)) // "HelloWorld"
 * console.log(chalkedCases("hello world", "constant", chalk.default.blue)) // "HELLO_WORLD"
 * console.log(chalkedCases("helloWorld", "split", chalk.default.blue)) // ["hello", "world"]
 * ```
 * @module
 */

import * as cases from "@luca/cases";
import * as chalk from "chalk";

export {
  /**
   * Re-export of {@link https://www.npmjs.com/package/chalk chalk}.
   *
   * @namespace chalk
   */
  chalk,
};

type CaseOption =
  | "camel"
  | "snake"
  | "kebab"
  | "title"
  | "pascal"
  | "constant"
  | "split";

/**
 * Convert a string to preferred case or split it while applying the passed chalk.
 *
 * When you pass `"split"` for `"caseOption"`, make sure `"str"` is a `"string"`. For all other case options,
 * `"str"` can be `"string"` or `"string"[]`.
 *
 * @param str The string (pieces) to convert and apply chalk.
 * @param casesOption Preferred case to convert to or "split" the str.
 * @param chalkInstance Chalk instance to apply.
 * @returns str Chalked string (pieces).
 */
export default function chalkedCases(
  str: string | string[],
  caseOption: CaseOption,
  chalkInstance: chalk.ChalkInstance,
): string | string[] {
  switch (caseOption) {
    case "camel":
      return chalkInstance(cases.camelCase(str));
    case "snake":
      return chalkInstance(cases.snakeCase(str));
    case "kebab":
      return chalkInstance(cases.kebabCase(str));
    case "title":
      return chalkInstance(cases.titleCase(str));
    case "pascal":
      return chalkInstance(cases.pascalCase(str));
    case "constant":
      return chalkInstance(cases.constantCase(str));
    case "split":
      if (typeof str === "string") {
        return chalkInstance(cases.splitPieces(str));
      } else {
        throw Error("str needs to be a string");
      }
  }
  caseOption satisfies never;
}
