
import type { Solution } from '../../../index'
import data from '../helpers/data'

// Ascii offsets from charCode 0
const UPPERCASE_OFFSET = 38
const LOWERCASE_OFFSET = 96

const getPriority = (char: string, upperCase?: boolean): number => char.charCodeAt(0) - (upperCase ? UPPERCASE_OFFSET : LOWERCASE_OFFSET)

const part1 = (): number => {
  const file = data({ day: 3 })

  let line
  let priorityTotal: number = 0
  while ((line = file.nextLine()) !== null) {
    const str1 = line.substring(0, line.length / 2).split('')
    const str2 = line.substring(line.length / 2).split('')

    const intersection = [...Array.from(new Set(str1))].filter(x => (new Set(str2)).has(x))
    if (intersection.length === 1) {
      priorityTotal += getPriority(intersection[0], /[A-Z]/.test(intersection[0]))
    }
  }

  return priorityTotal
}

const part2 = (): number => {
  const file = data({ day: 3 })

  let group
  let priorityTotal: number = 0
  while ((group = file.nextLines(3)) !== null) {
    const elf1Set = new Set(group[0].split(''))
    const elf2Set = new Set(group[1].split(''))
    const elf3Set = new Set(group[2].split(''))

    const intersection = [...Array.from(elf1Set)]
      .filter(x => (elf2Set).has(x))
      .filter(x => (elf3Set).has(x))

    if (intersection.length === 1) {
      priorityTotal += getPriority(intersection[0], /[A-Z]/.test(intersection[0]))
    }
  }

  return priorityTotal
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
