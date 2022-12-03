/**
 * Project: advent-of-code-2022
 * FilePath: /index.ts
 * File: index.ts
 * Created Date: Saturday, December 3rd 2022, 4:50:53 pm
 * Author: Craig Bojko (craig@pixelventures.co.uk)
 * -----
 * Last Modified: Sat Dec 03 2022
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2022 Pixel Ventures Ltd.
 * ------------------------------------
 */

import { default as problem1 } from './solutions/typescript/1'
// import { default as problem2 } from './2'
// import { default as problem3 } from './3'

export interface Solution {
  part1(): any;
  part2?(): any;
}

export const problems = [
  problem1,
  // problem2,
  // problem3,
]

; (function main() {
  const args: string[] = process.argv
  const argc: string = args[2]
  if (argc) {
    const i: number = parseInt(argc)
    if (problems[i - 1]) {
      const solution: Solution = problems[i - 1]
      solution.part1()
      solution.part2 && solution.part2()
    } else {
      console.warn(`Unable to obtain solution: arg ${argc}`)
      process.exit(1)
    }
  } else {
    console.warn(`You should provide the problem as an integer value: e.g. "yarn start 1"`)
    process.exit(1)
  }
}())
