# PartitionedArray

A PartitionedArray divides an array into a desired number of partitions. 
Any overflow of items is spread around between the 0th partition and the n-1th partition. 
If the number of items % partitions == 0, then all partitions will have the same number of elements.

If the number of partitions is more than the number of elements, then there will be partitions without any elements.
