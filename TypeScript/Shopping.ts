interface Cart{
   Code:string; 
   Name:string;
   Price:number;
   Count:number;
} 

var ShoppingCart =( function(){

   let Cart:Array<any>=[];
   function Item(Code:String,Name:String,Price:Number,Count:Number,Offer:String,Of_Count:Number,Of_Price:Number) {
      this.Code = Code;
      this.Name = Name;
      this.Price = Price;
      this.Count = Count;
      this.Offer = Offer;
      this.Of_Count = Of_Count;
      this.Of_Price = Of_Price;
   }

   function Offer(Count,Value,Price){
        if(Count<Value){
           var Oferta = Count;
        }
        else
        { 
            if(Count % Value === 0){
                Value = Count/Value;
                Oferta = Value * Price;
            }
            else{
                var Residue = Count % Value;
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

   var Obj:any ={};

   Obj.AddItem=(Code:String,Name:String,Price:Number,Count:Number,Offer='N',OF_Count=0,OF_Price=0)=>{
      for(var i in Cart){
        if(Cart[i].Code === Code){
           Cart[i].Count += Count;
           SaveCart();
           return;
        }
      }
     
      var item = new Item(Code, Name, Price, Count,Offer,OF_Count,OF_Price);
      Cart.push(item);
      SaveCart();
   };

   Obj.SetCount=(Code:string, Count:number)=>{
      for(var i in Cart){
       if(Cart[i].Code === Code){
         Cart[i].Count = Count;
         if (Cart[i].Count == 0) {
            Cart.splice(i, 1);
         }
          break;
       }
      }
      SaveCart();
   };

   Obj.SubtractItem = (Code:string)=>{
      for(var i:any; i in Cart;){
         if(Cart[i].Code === Code){
          Cart[i].Count --;
            if(Cart[i].Count === 0){
               Cart.splice(i,1);
            }
           break;
         }
      }
      SaveCart();
   };

   Obj.RemoveItem = (Code:string)=>{

      for(var i:any; i in Cart;){
         if(Cart[i].Code === Code){
            Cart.splice(i,1);
            break;
         }
      }
      SaveCart();
   };

   Obj.Clear=()=>{
      Cart =[];
      SaveCart();
   };

   Obj.CountCart =()=>{
      var TotalCount = 0;
      for (var i in  Cart) {
         TotalCount += Cart[i].Count;
      }
      return TotalCount;
   };

   Obj.TotalCart = ()=>{
     var TotalPrice=0;
      for (var i in  Cart) {
         TotalPrice += Cart[i].Price * Cart[i].Count;
      }
      return TotalPrice.toFixed(2);
   };

   Obj.ListCart=()=>{
      var CartCopy=[];
      for (var i in Cart) {
         var item = Cart[i];
         var itemCopy = {};
         var Total =0;

         for (var p in item) {
            itemCopy[p] = item[p];
         }

         if(item.Offer=='S'){
            Total = Offer(item.Count,item.OF_Count,item.OF_Price);
         }
         else{
            Total = item.Count;
         }
           
         itemCopy.Total = (item.Price * Total).toFixed(2);
         CartCopy.push(itemCopy);
      }
      return CartCopy;
   }

   return Obj;
})();

