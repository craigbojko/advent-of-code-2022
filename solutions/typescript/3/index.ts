
import type { Solution } from '../../../index'
import data from '../helpers/data'

const part1 = (): number => {
  const file = data({ day: 3 })
  const upperCaseOffset = 38
  const lowerCaseOffset = 96

  const getPriority = (char: string, upperCase?: boolean): number => char.charCodeAt(0) - (upperCase ? upperCaseOffset : lowerCaseOffset)

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
  return 0
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
