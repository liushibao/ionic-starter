import { BooleanStringPipe } from './boolean-string.pipe';

describe('BooleanStringPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanStringPipe();
    expect(pipe).toBeTruthy();
  });
});
