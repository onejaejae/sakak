export const generateAntSequence = (n) => {
  let str1 = '1';

  for (let i = 1; i <= n - 1; i++) {
    let prev = '';
    let tmp = '';
    let cnt = 0;

    for (let j = 0; j < str1.length; j++) {
      let s = str1[j];

      if (prev !== '' && prev !== s) {
        tmp += cnt + prev;
        cnt = 1;
      } else {
        cnt += 1;
      }

      prev = s;
    }

    tmp += cnt + prev;
    str1 = tmp;
  }

  const middleIndex = Math.floor(str1.length / 2) - 1;
  const middleTwoDigits = str1.substring(middleIndex, middleIndex + 2);

  return parseInt(middleTwoDigits, 10);
};

const res = generateAntSequence(8);
console.log(res);
