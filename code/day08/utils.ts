import { groupBy, intersection } from 'lodash';

export const segmentCountToDigit = new Map<number, string>([
  [2, '1'],
  [3, '7'],
  [4, '4'],
  [7, '8'],
]);

export function getDigitMapFromPattern(
  signalPattern: string[][]
): Map<string, string> {
  const map = new Map<string, string>();
  const signalsByLength = groupBy(signalPattern, (p) => p.length);
  Object.keys(signalsByLength).forEach((len) => {
    const easyDigit = segmentCountToDigit.get(parseInt(len));
    if (easyDigit) map.set(signalsByLength[len][0].join(''), easyDigit);
  });

  const {
    '2': one,
    '3': seven,
    '4': four,
    '7': eight,
    ...unknownSignals
  } = signalsByLength;

  // get 5 segments
  for (let i = 0; i < unknownSignals['5'].length; i++) {
    const s = unknownSignals['5'][i];
    if (intersection(s, one[0]).length === 2) {
      map.set(s.join(''), '3');
    } else if (intersection(s, four[0]).length === 3) {
      map.set(s.join(''), '5');
    } else {
      map.set(s.join(''), '2');
    }
  }

  // get 6 segments
  for (let i = 0; i < unknownSignals['6'].length; i++) {
    const s = unknownSignals['6'][i];
    if (intersection(s, four[0]).length === 4) {
      map.set(s.join(''), '9');
    } else if (intersection(s, one[0]).length === 2) {
      map.set(s.join(''), '0');
    } else {
      map.set(s.join(''), '6');
    }
  }

  return map;
}
