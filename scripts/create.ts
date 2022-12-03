/**
 * Project: advent-of-code-2022
 * FilePath: /scripts/create.ts
 * File: create.ts
 * Created Date: Saturday, December 3rd 2022, 6:15:03 pm
 * Author: Craig Bojko (craig@pixelventures.co.uk)
 * -----
 * Last Modified: Sat Dec 03 2022
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2022 Pixel Ventures Ltd.
 * ------------------------------------
 */

import fs from 'fs'
import path from 'path'

const validate = () => {
  if (process.argv.length < 3) {
    console.warn('You must provide a day number')
    process.exit(1)
  }
}

const create = () => {
  const day = process.argv[2]

  const template = `
import type { Solution } from '../../../index'
import data from '../helpers/data'

const part1 = (): number => {
  const file = data({ day: ${day} })

  return 0
}

const part2 = (): number => {
  return 0
}

const solution: Solution = {
  part1: () => {
    const resultPart1: number = part1()
    console.log(\`Result: 1 = \${JSON.stringify(resultPart1)}\`)
  },
  part2: () => {
    const resultPart2: any = part2()
    console.log(\`Result: 2 = \${JSON.stringify(resultPart2)}\`)
  },
}

export default solution
`

  const dir = path.resolve(__dirname, `../solutions/typescript/${day}`)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(path.resolve(dir, 'index.ts'), template)
}

if (require.main === module) {
  validate()
  create()
}
