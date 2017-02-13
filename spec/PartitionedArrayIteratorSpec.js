describe("A PartitionedArray.Iterator", 
function(){
    
    describe("hasNext() with PartitionedArray([1,2], 2)", 
    function(){
    
        it("should return true, when no items have been taken", function(){
            var items=[1,2];
            var partitionedArray = new PartitionedArray(items, 2);
            var iterator = partitionedArray.iterator();
            
            expect(iterator.hasNext()).toBe(true);
        });
        
        it("should return true, when not all items have been taken", function(){
            var items=[1,2];
            var partitionedArray = new PartitionedArray(items, 2);
            var iterator = partitionedArray.iterator();
            
            // take the first items
            var firstItem = iterator.next();
            expect(iterator.hasNext()).toBe(true);
        });
        
        it("should return false, when all items have been taken", function(){
            var items=[1,2];
            var partitionedArray = new PartitionedArray(items, 2);
            var iterator = partitionedArray.iterator();
            
            // take the two items
            iterator.next();
            iterator.next();
            expect(iterator.hasNext()).toBe(false);
        });
    });
    
    describe("next() with PartitionedArray of ([A,B,C,D,E,F,G],3)", 
    function(){
    
        beforeEach( function() {
            this.items=['A','B','C','D','E','F','G'];
            this.partitionedArray = new PartitionedArray(this.items, 3);
        });
    
        it("should return A, when called the first time", function(){
            var iterator = this.partitionedArray.iterator();
            expect(iterator.next()).toBe('A');
        });
        
        it("should return D, when called the second time", function(){
            var iterator = this.partitionedArray.iterator();
            iterator.next();
            expect(iterator.next()).toBe('D');
        });
        
        it("should return F, when called the third time", function(){
            var iterator = this.partitionedArray.iterator();
            iterator.next();
            iterator.next();
            expect(iterator.next()).toBe('F');
        });
        
        it("should return [A,D,F,B,E,G,C]", function()
        {
            var actual = [];
            var iterator = this.partitionedArray.iterator();
            
            while(iterator.hasNext())
            {
                actual.push(iterator.next());
            }
            expect(actual).toEqual(['A','D','F','B','E','G','C']);
        });
        
        it("should throw an Error when next() is called more than the number of items", function(){
            var iterator = this.partitionedArray.iterator();
            while(iterator.hasNext())
            {
                iterator.next();
            }
            
            var thrower = function()
            {
                return iterator.next();
            }
            
            //expect(constructed).toThrow(Error("items: must be non-null and non-empty."));
            expect(thrower).toThrow(Error("No such element."));
        });
        
    });
});