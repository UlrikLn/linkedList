"use strict";

const node1 = {
    prev: null,
    next: null,
    data: "A"
}


const node2 = {
    prev: null,
    next: null,
    data: "B"
}

const node3 = {
    prev: null,
    next: null,
    data: "C"
}

node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;


class LinkedList {
    constructor() {
        this.head = node1;
        this.tail = node1;
    }

    dumbList() {
        let a_node = this.head;
        while (a_node !== null) {
            console.log(`
            node: ${a_node.data} prev:
            -------- 
             ${a_node.prev ?.data}
             ${a_node.next?.data}
            `);
            a_node = a_node.next;
        }
    }
    add(node) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    }

    addLast(data) {
        const newNode = {
            prev: null,
            next: null,
            data
        };
        this.add(newNode);
    }

    addFirst(data) {
        const newNode = {
            prev: null,
            next: null,
            data
        };
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }
    removeLast() {
        if (!this.head) return;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return;
        }
        this.tail = this.tail.prev;
        this.tail.next = null;
    }

    removeFirst() {
        if (!this.head) return;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return;
        }
        this.head = this.head.next;
        this.head.prev = null;
    }

    removeNode(node) {
        if (!node) return; // Added to handle cases where node is null or undefined
    
        if (node === this.head && node === this.tail) {
            // Case where there's only one node in the list
            this.head = null;
            this.tail = null;
        } else if (node === this.head) {
            // Case where node is the head of the list
            this.head = node.next;
            this.head.prev = null;
        } else if (node === this.tail) {
            // Case where node is the tail of the list
            this.tail = node.prev;
            this.tail.next = null;
        } else {
            // Case where node is in the middle of the list
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
    }
    

    insertBeforeNode(existingNode, data) {
        const newNode = {
            prev: null,
            next: null,
            data
        };
        if (existingNode === this.head) {
            this.addFirst(data);
        } else {
            newNode.next = existingNode;
            newNode.prev = existingNode.prev;
            existingNode.prev.next = newNode;
            existingNode.prev = newNode;
        }
    }

    insertAfterNode(existingNode, data) {
        const newNode = {
            prev: null,
            next: null,
            data
        };
        if (existingNode === this.tail) {
            this.addLast(data);
        } else {
            newNode.next = existingNode.next;
            newNode.prev = existingNode;
            existingNode.next.prev = newNode;
            existingNode.next = newNode;
        }
    }

    swapNodes(node1, node2) {
        if (node1 === node2) return;

        let temp = null;

        // Handle adjacent nodes
        if (node1.next === node2) {
            this.removeNode(node1);
            this.insertBeforeNode(node2, node1.data);
        } else if (node2.next === node1) {
            this.removeNode(node2);
            this.insertBeforeNode(node1, node2.data);
        } else {
            temp = Object.assign({}, node1);
            node1.data = node2.data;
            node2.data = temp.data;
        }
    }

    nodeAt(index) {
        let currentNode = this.head;
        let count = 0;

        while (currentNode !== null) {
            if (count === index) {
                return currentNode;
            }
            count++;
            currentNode = currentNode.next;
        }
        return null;
    }

}

const ll = new LinkedList();
ll.add(node1);
ll.add(node2);
ll.add(node3);