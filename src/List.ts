export class Node<T> {
  value: T;
  ref?: Node<T>;

  get tail(): Node<T> {
    return this.ref ? this.tail : this;
  }

  constructor(value: T, next?: Node<T>) {
    this.value = value;
    this.ref = next;
  }

  prepend(value: T): Node<T> {
    return new Node(value, this);
  }

  append(value: T): Node<T> {
    return this.tail.ref = new Node(value);
  }

  // 初めてgenerator functionを使ったけどこれは便利ですね。
  *toArray(node: Node<T> = this): Iterable<T> {
    yield node.value;
    if (node.ref) {
      yield* this.toArray(node.ref);
    }
  }

  // FIXME: もっと良いIterator interfaceの実装があるように思う
  [Symbol.iterator] = () => this.toArray()[Symbol.iterator]();
}

export default class LinkedList<T> {
  head?: Node<T>;

  constructor(...items: T[]) {
    for (const value of items) {
      this.head = new Node(value, this.head);
    }
  }

  remove(target: Node<T>) {
  }

  insertBefore(target: Node<T>) {
  }

  insertAfter(target: Node<T>) {
  }

  concat(list: LinkedList<T>): LinkedList<T> {
    this.head ? (this.head.tail.ref = list.head) : list.head;
    return this;
  }

  reverse(): LinkedList<T> {
    if (!this.head) {
      return this;
    }
    this.head = (function loop(current?: Node<T>, prev?: Node<T>): Node<T> {
      if (current) {
        const ref = current.ref;
        current.ref = prev;
        return loop(ref, current);
      } else {
        return prev as Node<T>;
      }
    })(this.head, undefined);
    return this;
  }

  // FIXME: もっと良いIterator interfaceの実装があるように思う
  [Symbol.iterator] = () => (this.head?.toArray() ?? [])[Symbol.iterator]();
}
