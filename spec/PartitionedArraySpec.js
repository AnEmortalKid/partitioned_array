describe("A PartitionedArray", function() {


    describe("constructor", function()
    {
        it("should throw an error when items is null", function() {
            
            var constructed = function()
            {
                return new PartitionedArray(null, 1);
            }
            expect(constructed).toThrow(Error("items: must be non-null and non-empty."));
        });
        
        it("should throw an error when items is empty", function() {
           
            var items= new Array();
            var constructed = function()
            {
                return new PartitionedArray(items, 1);
            }
            expect(constructed).toThrow(Error("items: must be non-null and non-empty."));
        });
        
        it("should throw an error when partitions is non-positive", function(){
            
            var items = [1,2];
            var constructed = function()
            {
                return new PartitionedArray(items,0);
            };
            
            expect(constructed).toThrow(Error("partitions: must be positive."));
        });
    });
    
    describe("getPartitionCount()", function() {
        it("should have 1 partition when there are 2 items and partitions is 1", function(){
            
            var items = [1,2];
            var partitionedArray = new PartitionedArray(items,1);
            expect(partitionedArray.getPartitionCount()).toBe(1);
        });
        
        it("should have 2 partitions when there are 2 items and partitions is 2", function() {
            
            var items = [1,2];
            var partitionedArray = new PartitionedArray(items,2);
            expect(partitionedArray.getPartitionCount()).toBe(2);
        });
    
        it("should have 3 partitions when there are 2 items and partitions is 3", function() {
            
            var items = [1,2];
            var partitionedArray = new PartitionedArray(items,3);
            expect(partitionedArray.getPartitionCount()).toBe(3);
        });
    });    
    
});