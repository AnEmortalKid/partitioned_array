describe("A PartitionedArray", 
function() {

    describe("constructor", 
    function() {
        
        it("should throw an error when items is null", 
        function() {
            
            var constructed = function()
            {
                return new PartitionedArray(null, 1);
            }
            expect(constructed).toThrow(Error("items: must be non-null and non-empty."));
        });
        
        it("should throw an error when items is empty", 
        function() {
           
            var items= new Array();
            var constructed = function()
            {
                return new PartitionedArray(items, 1);
            }
            expect(constructed).toThrow(Error("items: must be non-null and non-empty."));
        });
        
        it("should throw an error when partitions is non-positive", 
        function(){
            
            var items = [1,2];
            var constructed = function()
            {
                return new PartitionedArray(items,0);
            };
            
            expect(constructed).toThrow(Error("partitions: must be positive."));
        });
    });
    
    describe("getPartitionCount()", 
    function() {
        
        it("should have 1 partition when there are 2 items and partitions is 1", 
        function(){
            
            var items = [1,2];
            var partitionedArray = new PartitionedArray(items,1);
            expect(partitionedArray.getPartitionCount()).toBe(1);
        });
        
        it("should have 2 partitions when there are 2 items and partitions is 2", 
        function() {
            
            var items = [1,2];
            var partitionedArray = new PartitionedArray(items,2);
            expect(partitionedArray.getPartitionCount()).toBe(2);
        });
    
        it("should have 3 partitions when there are 2 items and partitions is 3", 
        function() {
            var items = [1,2];
            var partitionedArray = new PartitionedArray(items,3);
            expect(partitionedArray.getPartitionCount()).toBe(3);
        });
    });    
    
    describe("getPartitionSizes()", 
    function(){
        
        it("exact: should return an array of size 2, with size 1 for each partition when items.length is 2 and partitions is 2", 
        function(){
            var items=[1,2];
            var partitionedArray = new PartitionedArray(items,2);
            
            var partitionSizes = partitionedArray.getPartitionSizes();
            
            expect(partitionSizes[0]).toBe(1);
            expect(partitionSizes[1]).toBe(1);
        });
        
        it("overflow: should return an array of size 2, with size 2 for partition 0 and size 1 for partition 1 partition when items.length=3 and partitions=2", 
        function(){
            var items=[1,2,3];
            var partitionedArray = new PartitionedArray(items,2);
            
            var partitionSizes = partitionedArray.getPartitionSizes();
            
            expect(partitionSizes[0]).toBe(2);
            expect(partitionSizes[1]).toBe(1);
        });
        
        it("overflow: should return an array of size 3, with sizes: partition[0]=2, partition[1]=2, partition[2]=1 when items.length=5 and partitions=3", 
        function(){
            var items=[1,2,3,4,5];
            var partitionedArray = new PartitionedArray(items,3);
            
            var partitionSizes = partitionedArray.getPartitionSizes();
            
            expect(partitionSizes[0]).toBe(2);
            expect(partitionSizes[1]).toBe(2);
            expect(partitionSizes[2]).toBe(1);
        });
        
        it("underflow: should return an array of size 3, with sizes: partition[0]=1, partition[1]=1, partition[2]=0 when items.length=2 and partitions=3",
        function(){
            var items=[1,2];
            var partitionedArray = new PartitionedArray(items,3);
            
            var partitionSizes = partitionedArray.getPartitionSizes();
            
            expect(partitionSizes[0]).toBe(1);
            expect(partitionSizes[1]).toBe(1);
            expect(partitionSizes[2]).toBe(0);
        });
    });
    
    describe("getMaxPartitionSize()",
    function() {
 
        it("should return size 1 when items.length=2 and partitions=2", 
        function() {
            var items=[1,2];
            var partitionedArray = new PartitionedArray(items,2);
            
            var max = partitionedArray.getMaxPartitionSize();
            expect(max).toBe(1);
        });
        
        it("should return size 2 when items.length=3 and partitions=2", 
        function() {
            var items=[1,2,3];
            var partitionedArray = new PartitionedArray(items,2);
            
            var max = partitionedArray.getMaxPartitionSize();
            expect(max).toBe(2);
        });
    });
        
    describe("getItems()", function(){
    
        it("should return the same items without modifying the order", 
        function(){
            var items=[1,2];
            var partitionedArray = new PartitionedArray(items,2);
            expect(partitionedArray.getItems()).toBe(items);
        });
    
    });
    
    describe("getItemCount()", function(){
        
        it("should return the same number of items as the length of the array used to construct it", 
        function(){
            var items=[1,2,3];
            var partitionedArray = new PartitionedArray(items,3);
            expect(partitionedArray.getItemCount()).toBe(3);
        });
    });

    describe("iterator()", function(){
        
        it("should return a non-null iterator", 
        function(){
            var items=[1,2,3];
            var partitionedArray = new PartitionedArray(items,3);
            expect(partitionedArray.iterator()).not.toBe(null);
        });
        
        it("should return a new iterator each time it is called", 
        function(){
            var items=[1,2,3];
            var partitionedArray = new PartitionedArray(items,3);
            expect(partitionedArray.iterator()).not.toBe(partitionedArray.iterator());
        });
    });    
});