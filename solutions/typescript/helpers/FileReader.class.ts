import fs from 'fs'

export default class FileReader {
  filename: string
  fd: number

  buffer: Buffer
  bufferSize: number = 10
  currentLine: string | null = null

  filePos: number = 0
  bufferPos: number = 0
  bytesInBuffer: number = 0

  constructor(filename: string) {
    this.filename = filename
    this.fd = fs.openSync(this.filename, 'r')
    this.buffer = Buffer.alloc(this.bufferSize)
    this.currentLine = null
    this.filePos = 0
    this.readIntoBuffer() // prime the buffer
  }

  readIntoBuffer(): number {
    const bytesRead: number = fs.readSync(
      this.fd,
      this.buffer,
      0,
      this.bufferSize,
      this.filePos
    )

    this.bytesInBuffer = bytesRead
    this.filePos += bytesRead
    this.bufferPos = 0

    return bytesRead
  }

  getBuffer(): Buffer {
    return this.buffer
  }

  getLine(): string | null {
    // return this.buffer.toString('utf8', this.bufferPos, this.buffer.toString().indexOf('\n', this.bufferPos))
    return this.currentLine
  }

  nextLine(): string | null {
    if (this.bytesInBuffer <= 0) {
      return null
    }

    let line: string = ''
    let lineEnd: number = -1
    const eolNotInBuffer = (): boolean =>
      (lineEnd = this.buffer.indexOf('\n', this.bufferPos)) < 0

    while (eolNotInBuffer()) {
      line += this.buffer.toString('utf8', this.bufferPos, this.bytesInBuffer)
      const read = this.readIntoBuffer()

      // EOF
      if (read <= 0) {
        return line
      }
    }

    line += this.buffer.toString('utf8', this.bufferPos, lineEnd)
    this.currentLine = line
    this.bufferPos = lineEnd + 1
    return line
  }

  nextLines(numberOfLines: number = 1, fromLine?: number): string[] | null {
    if (this.bytesInBuffer <= 0) {
      return null
    }
    if (fromLine) {
      this.goToLine(fromLine)
    }

    const lines: string[] = []
    let count = 1
    let line: string = ''
    let lineEnd: number = -1
    const eolNotInBuffer = (): boolean =>
      (lineEnd = this.buffer.indexOf('\n', this.bufferPos)) < 0

    while (count % (numberOfLines + 1) > 0) {
      while (eolNotInBuffer()) {
        line += this.buffer.toString('utf8', this.bufferPos, this.bytesInBuffer)
        const read = this.readIntoBuffer()
        // EOF
        if (read <= 0) {
          console.log('EOF')
          break
        }
      }

      line += this.buffer.toString('utf8', this.bufferPos, lineEnd)
      this.bufferPos = lineEnd + 1
      this.currentLine = line
      count += 1
      if (line && lines.length < numberOfLines && line !== '') {
        console.log(line, this.buffer.toString())
        lines.push(line)
      }
      line = ''
    }

    if (lines.length < numberOfLines) {
      return null
    }
    return lines
  }

  goToLine(lineNumber: number) {
    let numberOfEOLs = 0
    let line: string | null = ''

    this.reset()

    while (numberOfEOLs < lineNumber) {
      line = this.nextLine()
      numberOfEOLs += 1
    }

    return line
  }

  reset() {
    this.buffer = Buffer.alloc(this.bufferSize)
    this.filePos = 0
    this.bufferPos = 0
    this.bytesInBuffer = 0
    this.currentLine = null

    this.readIntoBuffer()
  }

  async close() {
    fs.close(this.fd, () => {})
  }
}
