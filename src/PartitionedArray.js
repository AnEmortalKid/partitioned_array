
/**
 * Represents a PartitionedArray. A PartitionedArray divides the items into equal parts, if possible, dividing any overflow into subsequent parts.
 * @constructor
 * @param {Array} items - the items to partition into the desired number of parts.
 * @param {Number} partitions - the number of partitions to divide the items into
 */
function PartitionedArray(items, partitions)
{
    if(!items || items.length < 1)
    {
        throw new Error("items: must be non-null and non-empty.")
    }
    
    if(partitions < 1)
    {
        throw new Error("partitions: must be positive.");
    }
    
    this.items=items;
    this.partitions=partitions;
    this.partitionSizes = createPartitions(items,partitions);
}

function createPartitions(items, partitions)
{
    var minPartitionSize = Math.floor(items.length/partitions);
    console.log('minPartitionSize:'+minPartitionSize);
    
    var carryOver = items.length % partitions;
    console.log('carryOver:'+carryOver);
    
    var partitionItems = new Array(partitions);
    
    // set all to min size
    for(i = 0; i < partitions; i++)
    {
        partitionItems[i]=minPartitionSize;
    }
    
    var partitionIndex=0;
    while(carryOver > 0)
    {
        partitionItems[partitionIndex]=minPartitionSize+1;
        carryOver--;
        partitionIndex++
    }
    
    return partitionItems;
}

/**
 * Returns the number of partitions in this PartitionedArray
 * @returns {Number} the number of partitions in this PartitionedArray
 */
PartitionedArray.prototype.getPartitionCount = function() 
{
    return this.partitions;
}

/**
 * Returns an array containing the number of elements in each partition.
 * @returns {Array} an array containing the number of elements in each partition.
 */
PartitionedArray.prototype.getPartitionSizes = function()
{
    return this.partitionSizes;
}

PartitionedArray.prototype.getMaxPartitionSize = function()
{
    return Math.max.apply(null, this.partitionSizes);
}

PartitionedArray.prototype.getItems = function() 
{
    return this.items;
}

PartitionedArray.prototype.getItemCount = function()
{
    return this.items.length;
}

PartitionedArray.prototype.getIterator = function()
{
    return new Iterator(this);
}

/**
 * Creates an Iterator for a PartitionedArray
 * @constructor
 * @param {PartitionedArray} partitionedArray - the PartitionedArray to iterate over
 */
function Iterator(partitionedArray)
{
    this.maxItemCount = partitionedArray.getItemCount();
    this.items = partitionedArray.getItems();
    this.partitionCount = partitionedArray.getPartitionCount();
    
    this.itemsCounted=0;
    this.partitionItemIndex = new Array(this.partitionCount);
    
    for(i = 0; i < this.partitionCount; i++)
    {
        this.partitionItemIndex[i]=0;
    }
    
    this.partitionItems = create2DArray(this.partitionCount);
    
    var itemsInPartition=0;
    var partitionNumber=0;
    
    var partitionSizes = partitionedArray.getPartitionSizes();
    for(currItemIndex = 0; currItemIndex < this.maxItemCount; currItemIndex++)
    {
        var maxItemsForPartition = partitionSizes[partitionNumber];
        if(maxItemsForPartition == itemsInPartition)
        {
            partitionNumber++;
            itemsInPartition=0;
        }
        this.partitionItems[partitionNumber][itemsInPartition]=this.items[currItemIndex];
        itemsInPartition++;
    }
    
    console.log(this.partitionItems);
    
}

function create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}


Iterator.prototype.hasNext = function()
{
    return this.itemsCounted < this.maxItemCount;
}


Iterator.prototype.next = function()
{
    
   if ( this.itemsCounted > this.maxItemCount)
   {
       throw new Error("No such element.")
   }
   
   var partitionIndex = this.itemsCounted % this.partitionCount;  
   var currentPartitionIndex = this.partitionItemIndex[partitionIndex];
   var item = this.partitionItems[partitionIndex][currentPartitionIndex];
   this.partitionItemIndex[partitionIndex]++;
   this.itemsCounted++;
   return item;
}


