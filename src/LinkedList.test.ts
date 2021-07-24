import LinkedList, { LinkedListNode } from './List';

describe('LinkedListNode()', () => {
  test('get head()', () => {
    const list = new LinkedListNode(1);
    expect(list.head.value).toEqual(1);
  });
});

describe('LinkedList()', () => {
  test('create new LinkedList() from iterable', () => {
    const array = [1,2,3,4];
    const list = new LinkedList(...array);
    expect(list.head?.value).toEqual(4);
  });
});
