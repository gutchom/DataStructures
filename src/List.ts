export class LinkedListNode<T> {
  value: T;
  next?: LinkedListNode<T>;

  get tail(): LinkedListNode<T> {return this.next ? this.tail : this;}
  set tail(node: LinkedListNode<T>) {this.tail.next = node;}
  get head(): LinkedListNode<T> {return this;}
  set head(node: LinkedListNode<T>) {node.next = this;}

  constructor(value: T, next?: LinkedListNode<T>) {
    this.value = value;
    this.next = next;
  }

  // TODO: テスト書く
  remove(target: LinkedListNode<T>) {
    this.findPrevNode(target).next = target.next;
    target.next = undefined;
  }

  // TODO: テスト書く
  insertBefore(target: LinkedListNode<T>) {
    const prev = this.findPrevNode(target);
    target.next = prev;
    target.next = prev.next?.next;
  }

  // TODO: テスト書く
  insertAfter(target: LinkedListNode<T>) {
    const prev = this.findPrevNode(target);
    target.next = prev.next?.next;
    prev.next = target;
  }

  findPrevNode(target: LinkedListNode<T>, current: LinkedListNode<T> = this.head): LinkedListNode<T> {
    return current.next === target ? current : this.findPrevNode(target, current.next);
  }

  // 初めてgenerator functionを使ったけどこれは便利ですね。
  *toArray(node: LinkedListNode<T> = this): Iterable<T> {
    yield node.value;
    if (node.next) {
      yield* this.toArray(node.next);
    }
  }

  // FIXME: もっと良いIterator interfaceの実装があるように思う
  [Symbol.iterator] = () => this.toArray()[Symbol.iterator]();
}

export default class LinkedList<T> {
  head?: LinkedListNode<T>;

  constructor(...items: T[]) {
    for (const value of items) {
      this.head = new LinkedListNode(value, this.head);
    }
  }

  // TODO: テスト書く
  concat(list: LinkedList<T>): LinkedList<T> {
    this.head ? (this.head.tail.next = list.head) : list.head;
    return this;
  }

  // FIXME: もっと良いIterator interfaceの実装があるように思う
  [Symbol.iterator] = () => (this.head?.toArray() ?? [])[Symbol.iterator]();
}
