import math

consoleInput = input()

sortedStr = ''.join(sorted(consoleInput))


# stores the occurrences of letters
arrOfOccurrences = []

# stores the letters (1 occurrence of them)
arrOfLetters = []

for i, letter in enumerate(sortedStr):
    if (i+1) == len(sortedStr):
        arrOfLetters.append(sortedStr[i])
    elif sortedStr[i+1] == sortedStr[i]:
        continue
    else:
        arrOfLetters.append(sortedStr[i])

for letter in arrOfLetters:
    occurrence = sortedStr.count(letter)
    arrOfOccurrences.append(occurrence)

# count factorial num
lenOfStr = len(sortedStr)
# factorial = 1

# test
# print(math.factorial(lenOfStr))
factorial = math.factorial(lenOfStr)
'''if lenOfStr == 0:
    print(1)
else:
    for i in range(1, lenOfStr+1):
        factorial *= i'''

# count divider
dividerFactorial = 1.0

for num in arrOfOccurrences:
    if num > 1:
        dividerFactorial *= math.factorial(num)


result = 0

if dividerFactorial == 1:
    print(factorial)
else:
    result = factorial / dividerFactorial
    # print("{:.0f}".format(float(result)))
    # result = f"{result:.0f}"
    # print(result)
    # print("%.f" % factorial)
    print("%.f" % result)

# print(sortedStr)
# print(arrOfLetters)
# print(arrOfOccurrences)


# cases from test
# abcdefghijklmnopqrstuvwxyz
# 403291461126605635584000000

# abcdefghijklmabcdefghijklm
# 49229914688306352000000

