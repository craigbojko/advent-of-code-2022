
import type { Solution } from '../../../index'
import data from '../helpers/data'

const isSubset = (set1: Set<number>, set2: Set<number>): boolean => {
  for (const item of set1) {
    if (!set2.has(item)) {
      return false
    }
  }
  return true
}

const part1 = (): number => {
  const file = data({ day: 4 })

  let runningTotal = 0
  let line;
  while (!!(line = file.nextLine())) {
    const [elf1, elf2] = line.split(',')
    const [x1, y1] = elf1.split('-')
    const [x2, y2] = elf2.split('-')

    // Create sets of all the coordinates in the elf's claim
    const set1 = new Set(new Array(100).fill(1, Number(x1), Number(y1) + 1).map((v, i) => i))
    const set2 = new Set(new Array(100).fill(1, Number(x2), Number(y2) + 1).map((v, i) => i))

    if (isSubset(set1, set2) || isSubset(set2, set1)) {
      runningTotal += 1
    }
  }

  return runningTotal
}

const part2 = (): number => {
  const file = data({ day: 4 })

  let runningTotal = 0
  let line;
  while (!!(line = file.nextLine())) {
    const [elf1, elf2] = line.split(',')
    const [x1, y1] = elf1.split('-')
    const [x2, y2] = elf2.split('-')

    // Create sets of all the coordinates in the elf's claim
    const set1 = new Set(new Array(100).fill(1, Number(x1), Number(y1) + 1).map((v, i) => i))
    const set2 = new Set(new Array(100).fill(1, Number(x2), Number(y2) + 1).map((v, i) => i))
    const intersection = Array.from(set1).filter(x => set2.has(x)).filter(x => x)
    runningTotal += intersection.length > 0 ? 1 : 0

    // console.debug(`
    // Set1: ${[...Array.from(set1)].join(' ')}
    // Set2: ${[...Array.from(set2)].join(' ')}
    // Intersection: ${intersection}
    // Size: ${intersection.length}
    // \n`)
  }

  return runningTotal
}

const solution: Solution = {
  part1: () => {
    const resultPart1: number = part1()
    console.log(`Result: 1 = ${JSON.stringify(resultPart1)}`)
  },
  part2: () => {
    const resultPart2: any = part2()
    console.log(`Result: 2 = ${JSON.stringify(resultPart2)}`)
  },
}

export default solution
