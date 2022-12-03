import path from 'path'
import FileReader from './FileReader.class'

describe('GIVEN a text file', () => {
  let file: FileReader

  beforeAll(() => {
    file = new FileReader(path.resolve(process.cwd(), './solutions/typescript/helpers/fixtures/basicText1.txt'))
  })

  it('THEN has a line in the buffer', () => {
    expect(file.getBuffer().toString()).toEqual('1\n2\n3\n4\n5\n')
  })

  describe('WHEN reading lines', () => {
    beforeAll(() => {
      file.reset()
      file.nextLine() // read the first line
    })

    it('THEN reads the second line', () => {
      expect(file.nextLine()).toEqual('2')
    })

    it('THEN reads the third line', () => {
      expect(file.nextLine()).toEqual('3')
    })
  })

  describe('AND calling goToLine', () => {
    beforeEach(() => {
      file.reset()
      file.goToLine(5)
    })

    it('SHOULD return the line', () => {
      expect(file.nextLine()).toEqual('6')
    })
  })

  describe('AND requesting multiple lines', () => {
    beforeAll(() => {
      file.reset()
    })

    it('THEN reads and returns a group of lines', () => {
      expect(file.nextLines(3)).toEqual(['1', '2', '3'])
    })

    describe('AND supplying a `fromLine` parameter', () => {
      it('THEN reads and returns a group of lines from a specific line', () => {
        expect(file.nextLines(3, 2)).toEqual(['3', '4', '5'])
      })
    })

    describe('WHEN moving to a position', () => {
      beforeEach(() => {
        file.goToLine(5)
      })

      it('THEN has a current line at the position', () => {
        expect(file.getLine()).toEqual('5')
      })

      it('THEN returns a group of lines at the new position', () => {
        expect(file.nextLines(2)).toEqual(['6', '7'])
      })
    })

    describe('WHEN moving to a new position', () => {
      beforeEach(() => {
        file.goToLine(12)
      })

      it('THEN has a current line at the position', () => {
        expect(file.getLine()).toEqual('12')
      })

      it('THEN returns a group of lines at the new position', () => {
        expect(file.nextLines(2)).toEqual(['13', '14'])
      })
    })
  })
})
