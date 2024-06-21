class IceCreamShopSingleton {
    constructor(name) {
        if (IceCreamShopSingleton._instance) {
            throw new Error('IceCreamShopSingleton has already been instantiated.');
        }
        this.name = name;
        IceCreamShopSingleton._instance = this;
    }

    static getInstance(name) {
        if (!IceCreamShopSingleton._instance) {
            new IceCreamShopSingleton(name);
        }
        return IceCreamShopSingleton._instance;
    }

    serveIceCream(iceCream, topping, place) {
        console.log(`Serving ${iceCream} with ${topping} ${place}.`);
    }
}

class IceCream {
    constructor(flavor) {
        this.flavor = flavor;
    }

    toString() {
        return this.flavor;
    }
}

class IceCreamFactory {
    static flavors = new Map([
        ["vanilla", "vanilla"],
        ["chocolate", "chocolate"],
        ["strawberry", "strawberry"]
    ]);

    static createIceCream(flavor) {
        if (IceCreamFactory.flavors.has(flavor)) {
            return new IceCream(IceCreamFactory.flavors.get(flavor));
        } else {
            throw new Error("Unknown flavor");
        }
    }
}

class IceCreamDecorator {
    constructor(iceCream) {
        this.iceCream = iceCream;
    }

    getDescription() {
        return this.iceCream.toString();
    }
}

class ChocolateSyrupDecorator extends IceCreamDecorator {
    getDescription() {
        return `${this.iceCream.toString()} with chocolate syrup`;
    }
}

class ChocolateSprinklesDecorator extends IceCreamDecorator {
    getDescription() {
        return `${this.iceCream.toString()} with chocolate sprinkles`;
    }
}

class EatingPlaceStrategy {
    eat() {
        throw new Error("This method should be overridden!");
    }
}

class InShopStrategy extends EatingPlaceStrategy {
    eat() {
        return "in the shop";
    }
}

class InParkStrategy extends EatingPlaceStrategy {
    eat() {
        return "in the park";
    }
}

class AtBeachStrategy extends EatingPlaceStrategy {
    eat() {
        return "at the beach";
    }
}

// Example usage:
const shop = IceCreamShopSingleton.getInstance("Cool Treats");

try {
    const chocolateIceCream = IceCreamFactory.createIceCream("chocolate");
    const chocolateIceCreamWithSyrup = new ChocolateSyrupDecorator(chocolateIceCream);
    const placeStrategy = new AtBeachStrategy();

    shop.serveIceCream(chocolateIceCreamWithSyrup.getDescription(), "", placeStrategy.eat());
} catch (error) {
    console.error(error.message);
}
