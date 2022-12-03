/**
 * Project: advent-of-code-2022
 * FilePath: /solutions/typescript/2/index.ts
 * File: index.ts
 * Created Date: Saturday, December 3rd 2022, 6:32:09 pm
 * Author: Craig Bojko (craig@pixelventures.co.uk)
 * -----
 * Last Modified: Sat Dec 03 2022
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2022 Pixel Ventures Ltd.
 * ------------------------------------
 */

import type { Solution } from '../../../index'
import data from '../helpers/data'

type SHAPES = 'ROCK' | 'PAPER' | 'SCISSORS'

enum SHAPE_VALUES {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum SCORES {
  WIN = 6,
  DRAW = 3,
  LOSE = 0,
}

const SHAPES_MAP: Record<string, SHAPES> = {
  'A': 'ROCK',
  'B': 'PAPER',
  'C': 'SCISSORS',
  'X': 'ROCK',
  'Y': 'PAPER',
  'Z': 'SCISSORS',
}

const desiredOutcomes: Record<SCORES, string> = {
  [SCORES.LOSE]: 'X',
  [SCORES.DRAW]: 'Y',
  [SCORES.WIN]: 'Z',
}

const desiredOutcomeScoreMap: Record<string, SCORES> = {
  'X': SCORES.LOSE,
  'Y': SCORES.DRAW,
  'Z': SCORES.WIN,
}

const outcomeMapWin = {
  [SHAPE_VALUES.ROCK]: SHAPE_VALUES.SCISSORS,
  [SHAPE_VALUES.PAPER]: SHAPE_VALUES.ROCK,
  [SHAPE_VALUES.SCISSORS]: SHAPE_VALUES.PAPER,
}
const outcomeMapLose = {
  [SHAPE_VALUES.ROCK]: SHAPE_VALUES.PAPER,
  [SHAPE_VALUES.PAPER]: SHAPE_VALUES.SCISSORS,
  [SHAPE_VALUES.SCISSORS]: SHAPE_VALUES.ROCK,
}

const getOutcome = (opponent: string, player: string): SCORES => {
  const opponentShape: SHAPES = SHAPES_MAP[opponent]
  const playerShape: SHAPES = SHAPES_MAP[player]

  if (opponentShape === playerShape) return SCORES.DRAW
  if (outcomeMapWin[SHAPE_VALUES[playerShape]] === SHAPE_VALUES[opponentShape]) return SCORES.WIN
  return SCORES.LOSE
}

const determineShape = (opponent: string, desiredOutcome: string): SHAPE_VALUES => {
  if (desiredOutcome === desiredOutcomes[SCORES.DRAW]) {
    return SHAPE_VALUES[SHAPES_MAP[opponent]]
  }

  const opponentShape: SHAPES = SHAPES_MAP[opponent]

  if (desiredOutcome === desiredOutcomes[SCORES.WIN]) {
    // Give us the shape that would beat the opponent
    return outcomeMapLose[SHAPE_VALUES[opponentShape]]
  }
  // Give us the shape that would lose to the opponent
  return outcomeMapWin[SHAPE_VALUES[opponentShape]]
}

const part1 = (): number => {
  const file = data({ day: 2 })

  let runningScore = 0
  let line: string | null
  while((line = file.nextLine()) !== null) {
    const [opponent, player] = line.split(' ')
    if (!opponent || !player) continue

    const outcome = getOutcome(opponent, player)
    const shapeScore = SHAPE_VALUES[SHAPES_MAP[player]]
    runningScore += outcome + shapeScore
  }

  return runningScore
}

const part2 = (): number => {
  const file = data({ day: 2 })

  let runningScore = 0
  let line: string | null
  while((line = file.nextLine()) !== null) {
    const [opponent, desiredOutcome] = line.split(' ')
    if (!opponent || !desiredOutcome) continue

    const playerShapeScore = determineShape(opponent, desiredOutcome)
    runningScore += desiredOutcomeScoreMap[desiredOutcome] + playerShapeScore
  }

  return runningScore
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
