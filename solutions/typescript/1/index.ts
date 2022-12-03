import type { Solution } from '../../../index'
import data from '../helpers/data'

const elvenCalorieCount: number[] = []

const part1 = (): number => {
  const file = data({ day: 1 })

  let highestCalorieCount = 0
  let elf: string[] = [];
  let line

  while ((line = file.nextLine()) !== null) {
    if (line === '') {
      const currentElfCalories = elf.reduce((acc, cur) => acc += Number(cur), 0)
      elvenCalorieCount.push(currentElfCalories)
      highestCalorieCount = Math.max(highestCalorieCount, currentElfCalories)
      elf = []
      continue
    }
    elf.push(line)
  }

  return highestCalorieCount
}

const part2 = (): number => {
  const topThree = [0, 0, 0]
  elvenCalorieCount.forEach((elf: number) => {
    if (elf > topThree[0]) {
      topThree[0] = elf
      // push the highest to the top
      // so we can compare against the lowest
      topThree.sort((a, b) => a - b)
    }
  })
  return topThree.reduce((acc, cur) => acc += cur, 0)
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
