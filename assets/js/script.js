
const boton = document.getElementById("enviar");


const getUser = async (usuario) => {
    try {       
        const urlAPI    = `https://api.github.com/users/${usuario}`;
        const respuesta = await fetch(urlAPI)
        const div       = document.getElementById("resultadoUsuario"); 

        if (respuesta.ok)
        {
            let response = await respuesta.json();
                
            const avatarUsuario = `<img src="${response.avatar_url}" width="200px" height="200px">`;
            const nombreUsuario = `<br>Nombre de usuario : ${response.name}`;
            const loginUsuario = `<br>Nombre de login : ${response.login}`
            const numeroRepositorioUsuario = `<br>Cantidad de Repositorio : ${response.public_repos}`
            const localidadUsuario = `<br>Localidad : ${response.location}`
            const tipoUsuario = `<br>Tipo de usuario :  ${response.company}`
            
            div.innerHTML = avatarUsuario + nombreUsuario + loginUsuario + numeroRepositorioUsuario + localidadUsuario + tipoUsuario;
        }
        else {
           alert("¡ Usuario no exite !");
        }

    } catch (err) {
        console.error(err)
    }
}


const getRepo = async (usuario, pagina, cantidad_repos) => {
    try {       
        const API_PAGINADO = `https://api.github.com/users/${usuario}/repos?page=${pagina}&per_page=${cantidad_repos}`;
        console.log(API_PAGINADO);
        const respuesta = await fetch(API_PAGINADO);

        const div = document.getElementById("resultadosRepositorios");

        if (respuesta.ok)
        {
           var response = await respuesta.json();

           console.log(response);

           response.forEach(function(repositorio) {
               div.innerHTML +=  `<br> ${repositorio.name}`;
           });
       }

    } catch (err) {
        console.error(err)
    }
}


boton.addEventListener('click', function (event) {
    const usuario = document.getElementById("nombre");
    const pagina = document.getElementById("pagina");
    const repoPagina = document.getElementById("repoPagina");

    getUser(usuario.value);
    
    getRepo(usuario.value, pagina.value, repoPagina.value);
});
