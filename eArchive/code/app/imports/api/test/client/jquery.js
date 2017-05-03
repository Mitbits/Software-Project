

export const jQuery = function(arg){
	this.arg = arg;
	this.form_submit =function(){
		console.log("form submitted");
	};

	this.order_submit = function(food){
		console.log("food submitted:" +food);
	};

        this.loadPage = function(pageName) {
            console.log('loaded page' + pageName);
        };

        this.containsGraphs = function(num) {
            console.log('checking graphs...');
        }

        this.clickBuyBtn = function(item) {
            console.log('buying item...');
        }

        this.checkShoppingList = function(item) {
            console.log('checking shopping list...');
        }

        this.clickRmBtn = function(item) {
            console.log('removing item...');
        }

	return this;

}
