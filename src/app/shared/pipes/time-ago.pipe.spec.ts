import { TimeAgoPipe } from './time-ago.pipe';
import moment from 'moment';

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('display time ago', (done: DoneFn) => {
    const pipe = new TimeAgoPipe();
    const date = '2023-07-10T13:49:51.141Z';
    const timeAgo = pipe.transform(date);

    timeAgo.subscribe((value) => {
      expect(value).toBe(moment(date).fromNow());
      done();
    });
  });
});
