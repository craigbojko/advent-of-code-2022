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

export interface Solution {
  part1(): any;
  part2?(): any;
}

const problems: Record<number, Solution> = {}

const loadProblem = async (day: number): Promise<Solution> => {
  const problem = await import(`./solutions/typescript/${day}`)
  problems[day] = problem.default
  return problem.default
}

const run = async (): Promise<void> => {
  const args: string[] = process.argv
  const argc: string = args[2]
  if (argc) {
    const i: number = parseInt(argc)
    await loadProblem(i)

    if (problems[i]) {
      const solution: Solution = problems[i]
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
}

if (require.main === module) {
  run()
}
