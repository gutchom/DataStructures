import LinkedList , { Node } from './List';

describe('LinkedListNode()', () => {
  test('has value', () => {
    const node = new Node(1);
    expect(node.value).toEqual(1);
  });

  test('prepend()', () => {
    const node = new Node(1);
    const second = node.prepend(2);
    const third = node.prepend(3);
    expect(node.value).toEqual(1);
    expect(second.value).toEqual(2);
    expect(third.value).toEqual(3);
  });
});

describe('LinkedList()', () => {
  test('create new LinkedList() from iterable', () => {
    const array = [1,2,3,4];
    const list = new LinkedList(...array);
    expect(list.head?.value).toEqual(4);
  });

  test('convert LinkedList to Array', () => {
    const array = [1,2,3,4];
    const list = new LinkedList(...array);
    expect([...list]).toEqual(array.reverse());
  });
});
