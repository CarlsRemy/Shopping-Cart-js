  function Open()
  {
    valor = $("#Shopping-Cart").hasClass("sidebar-open");

    if(valor)
    {
      Close();
    }
    else
    {
     // $(".sidebar-contents").empty(); 
      document.getElementById("Shopping-Cart").classList.add('sidebar-open');
     /// Tabla ="./Compras.php"; 
      //$("#carrito2").load(Tabla); 
    }
  }


  function Close()
  {
    document.getElementById("Shopping-Cart").classList.remove('sidebar-open');
   // $(".sidebar-contents").empty(); 
    //$(window).scrollTop(0);
  }