import { generateAntSequence } from './coding-test';

describe('coding test', () => {
  it('입력 n=5, 출력 m=12', () => {
    const result = generateAntSequence(5);

    expect(result).toBe(12);
  });

  it('입력 n=8, 출력 m=21', () => {
    const result = generateAntSequence(8);

    expect(result).toBe(21);
  });
});
