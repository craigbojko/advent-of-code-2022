/**
 * Project: advent-of-code-2022
 * FilePath: /solutions/typescript/helpers/dataDir.ts
 * File: dataDir.ts
 * Created Date: Saturday, December 3rd 2022, 5:14:21 pm
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
import FileReader from './FileReader.class'

export const dataDir = (): string => {
  return path.resolve(__dirname, '../../../data')
}

export const dataAsStringArray = (day: number): string[] => {
  const dataPath = path.resolve(dataDir(), `day${day}.txt`)
  const data = fs.readFileSync(dataPath, 'utf8')
  return data.split('\n')
}

export default function data(day: number, part: number = 1): FileReader {
  const file = path.resolve(dataDir(), `day${day}.txt`)
  if (fs.existsSync(file)) {
    return new FileReader(file)
  }

  throw new Error(`Unable to find data file: ${file}`)
}
