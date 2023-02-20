export const convertToRoman = (num) => {
  const romanNumeralMap = [
    { value: 1000000, symbol: 'M̅' },
    { value: 900000, symbol: 'C̅M̅' },
    { value: 500000, symbol: 'D̅' },
    { value: 400000, symbol: 'C̅D̅' },
    { value: 100000, symbol: 'C̅' },
    { value: 90000, symbol: 'X̅C̅' },
    { value: 50000, symbol: 'L̅' },
    { value: 40000, symbol: 'X̅L̅' },
    { value: 10000, symbol: 'X̅' },
    { value: 9000, symbol: 'M̅X̅' },
    { value: 5000, symbol: 'V̅' },
    { value: 4000, symbol: 'M̅V̅' },
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ]

  let romanNumeral = ''

  for (let i = 0; i < romanNumeralMap.length; i++) {
    while (num >= romanNumeralMap[i].value) {
      romanNumeral += romanNumeralMap[i].symbol
      num -= romanNumeralMap[i].value
    }
  }

  return romanNumeral
}
