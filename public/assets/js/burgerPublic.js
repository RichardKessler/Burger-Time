// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
    $(".devour").on("click", (event) => {
       var id = $(this).attr('data-id');
      // var burger_id = $(this).children(".id").val();
      // console.log('id', burger_id);
       var eaten = $(this).data("eaten");

       var eaten = {
           devoured: true
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
       type: "PUT",
       data: eaten
     }).then(() => {
         console.log("burger has beeen devoured", eaten);
         // Reload the page to get the updated list
         location.reload();
       }
     );
   });
   $(".create-form").on("submit", (event) => {
       // Make sure to preventDefault on a submit event.
       event.preventDefault();
       console.log("clicked")
   
       const newBurger = {name: $("#ca").val().trim(),
       };
   
       // Send the POST request.
       $.ajax("/api/burgers", {
         type: "POST",
         data: newBurger
       }).then(() => {
           console.log("created new burger");
           // Reload the page to get the updated list
           location.reload();
         }
       );
     });
   });