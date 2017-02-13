# PartitionedArray

A PartitionedArray divides an array into a desired number of partitions. 
Any overflow of items is spread around between the 0th partition and the n-1th partition. 
If the number of items % partitions == 0, then all partitions will have the same number of elements.

If the number of partitions is more than the number of elements, then there will be partitions without any elements.

# Use Cases

Recently, I had the need to create a grid that looked like this:

```
A D F
B E G
C 
```

And the data that I got to create it was `[A,B,C,D,E,F,G]`, so I decided to create PartitionedArray, with an Iterator that would return the items in the following order: `[A,D,F,B,E,G,C]`
