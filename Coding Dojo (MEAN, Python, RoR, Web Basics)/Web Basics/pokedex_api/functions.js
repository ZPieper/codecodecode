$(document).ready(function()
{
    for (var i = 1; i <= 151; i++)
    {
        $('#pokemon').append("<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + i + ".png' id = " + i + " >");
    }

    $('img').click(function()
    {
       var id = $(this).attr('id');
        $.get("https://pokeapi.co/api/v2/pokemon/" + id + "/", function(res)
    {
        var html_str = "<h2>" + res.name + "</h2>";
        html_str += "<img src = '";
        html_str += res.sprites.front_default + "'>";
        html_str += "<h4>Types</h4>";
        for (var i = 0; i < res.types.length; i++)
        {
            html_str += "<li>" + res.types[i].type.name + "</li>";
        }
        html_str += "<h4>Height</h4>";
        html_str += res.height;
        html_str += "<h4>Weight</h4>";
        html_str += res.weight;
        $('#pokedex').html(html_str);
    }, 
    "json");
    });
});