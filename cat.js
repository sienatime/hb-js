var Cat = function(name, furColor) {
    this.name = name;
    this.furColor = furColor;
    this.tiredness = 50;
    this.hunger = 50;
    this.loneliness = 50;
    this.happiness = 50;

    this.sleep = function(numMinutes) {
        for (var i=0; i<numMinutes; i++) {
            console.log("z");
            this.tiredness--;
        }
    };
    this.eat = function(amtFood){
        for( var i=0; i<amtFood; i++){
            console.log("nom");
            this.hunger--;
        }
    };
    this.pat = function(noTimes) {
        for(var i=0; i<noTimes; i++) {
            console.log("purr");
            this.happiness++;
            this.loneliness--;
        }
    };

    this.printStats = function(){
        console.log("Tiredness: " + this.tiredness);
        console.log("Happiness: " + this.happiness);
        console.log("Loneliness: " + this.loneliness);
        console.log("Hunger: " + this.hunger);
    };
};

function printStats(cat){
    

}

var virtualCat = new Cat("Fluffy", "white");
virtualCat.pat(5);
virtualCat.printStats();