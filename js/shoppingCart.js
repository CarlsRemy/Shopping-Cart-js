// ***************************************************
// Shopping Cart functions

var ShoppingCart  = (function () {
    // Private methods and properties
    var Cart = [];

    function Item(Code, Name, Price, Count,Offer,OF_Count,OF_Price) {
        this.Code = Code;
        this.Name = Name;
        this.Price = Price;
        this.Count = Count;
        this.Offer = Offer;
        this.OF_Count = OF_Count;
        this.OF_Price = OF_Price;
    }

    function Offer(Count,Value,Price){
        if(Count<Value){
            Oferta = Count;
        }
        else
        { 
            if(Count % Value === 0){
                Value = Count/Value;
                Oferta = Value * Price;
            }
            else{
                Residue = Count % Value;
                Value = Math.floor(Count / Value) + Residue;
                Oferta = Value * Price;
            }
        }
        return Oferta
    }

    function SaveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(Cart));
    }

    function LoadCart() {
        Cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (Cart === null) {
            Cart = [];
        }
    }

    LoadCart();
    // Public methods and properties
    var Obj = {};

    Obj.AddItem = function (Code, Name, Price, Count,Offer='N',OF_Count=0,OF_Price=0) {
        for (var i in Cart) {
            if (Cart[i].Code === Code) {
                Cart[i].Count += Count;
                SaveCart();
                return;
            }
        }
        var item = new Item(Code, Name, Price, Count,Offer,OF_Count,OF_Price);
        Cart.push(item);
        SaveCart();
    };

    Obj.SetCount = function (Code, Count) {
        for (var i in Cart) {
            if (Cart[i].Code === Code) {
                Cart[i].Count = Count;
                if (Cart[i].Count == 0) {
                    Cart.splice(i, 1);
                }
                break;
            }
        }
        SaveCart();
    };

    Obj.SubtractItem = function (Code) {
        for (var i in Cart) {
            if (Cart[i].Code === Code) {
                Cart[i].Count--;
                if (Cart[i].Count == 0) {
                    Cart.splice(i, 1);
                }
                break;
            }
        }
        SaveCart();
    };

    Obj.RemoveItem = function (Code) {
        for (var  i in Cart) {
            if (Cart[i].Code === Code) {
                Cart.splice(i, 1);
                break;
            }
        }
        SaveCart();
    };

    Obj.Clear = function () {
        Cart = [];
        SaveCart();
    };

    Obj.CountCart = function () {
        var TotalCount = 0;
        for (var i in Cart) {
            TotalCount += Cart[i].Count;
        }
        return TotalCount;
    };

    Obj.TotalCart = function () {
        var TotalPrice = 0;
        for (var i in Cart) {
            TotalPrice += Cart[i].Price * Cart[i].Count;
        }
        return TotalPrice.toFixed(2);
    };

    Obj.ListCart = function () {
        var CartCopy = [];
        for (var i in Cart) {
            var item = Cart[i];
            var itemCopy = {};
            var Total =0;

            for (var p in item) {
                itemCopy[p] = item[p];
            }

            if(item.Offer=='S'){
                Total = Offer(item.Count,item.OF_Count,item.OF_Price);
            }else{
                Total = item.Count;
            }
           
            itemCopy.Total = (item.Price * Total).toFixed(2);
            CartCopy.push(itemCopy);
        }
        return CartCopy;
    };
    // ----------------------------
    return Obj;
})();
