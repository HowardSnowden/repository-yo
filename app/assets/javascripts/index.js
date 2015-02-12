
var ready = function() {
    
    var id = null;
    //create form, all this is a bit messy can reorganize the code at some ppoint    
    var form = formCreate("<input type='text'>", 4);
    var reg = /(<td><input type='text'><\/td>)/g;
    var matches = form.match(reg);
    form = '<tr>'+ matches[0]+'<td><textarea></textarea></td>'+matches[1]+matches[2]+'<td><a href=#>Submit</a></td></tr>';
   //shows new form when clicking new version
    $('#new').click(function(e){
        e.preventDefault();
        $(form).appendTo('thead').hide().fadeIn('slow');
        
    });
    // Submit to rails via ajax
     $(document).on('click', "a:contains('Submit')", function(){
         
         var data = getData();
         
         $.post( "/versions.json", {version: {version:data[0], description:data[3], by:data[1], document:data[2]}} )
                .fail(function(msg){
                    alert(JSON.stringify(msg));
                })
                .done(function(){
                    location.reload();
                });
             
     });
    
    //Edit a version
    
    $(document).on('click', "a:contains('Edit')", function(e){
        e.preventDefault();
    
       var line=  $(this).parent().parent().find('td');
        
        var vers = "'"+$(line[0]).text()+"'";

        var desc = $(line[1]).text();
        var by = "'"+$(line[2]).text()+"'";
        var doc = "'"+$(line[3]).text()+"'";
        id = $(line[5]).html();
        var reg = /\d+/;
        var num = id.match(reg);
        id = num[0];
        var editForm = "<tr><td><input type='text' value="+vers+"></td><td><textarea>"+desc+"</textarea></td><td><input                 type='text' value="+by+"></td>"+
        "<td><input type='text' value="+doc+"></td><td><a href=#>Update</a></td><td><a href=#>Cancel</a></td></tr>";
        $(this).parent().parent().replaceWith(editForm);
    });
    //submit Edit
    $(document).on('click', "a:contains('Update')", function(e){
        e.preventDefault();
        var data = getData();
        $.ajax({
            url:'/versions/'+id+'.json', 
            type: 'PUT',
            data: {version: {version:data[0], description:data[3], by:data[1], document:data[2]}}
        }).fail(function(msg){
                    alert(JSON.stringify(msg));
                })
                .done(function(){
                    location.reload();
                });
             
        
    });
    
    
};

function formCreate(elements, num){
    var form = "<tr>";
    for (var k=0; k <num; k++){
      form += "<td>"+elements+ "</td>";
    }
    return form += "<td><a href=#>Submit</a></td></tr>";
}

function getData(){
    var data = [];
         var elem = $('input');
         
         for (var i =0; i < elem.length; i++){
             
             data[i] = $(elem[i]).val();
         }
         
         data[3] = $('textarea').val();
    
    return data;
}

$(document).ready(ready);
$(document).on('page:load', ready);