

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
	return this;

}
