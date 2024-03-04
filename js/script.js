const listaUsuarios = document.getElementById('listaUsuarios');

function generarEdadAleatoria() {
    return (Math.floor(Math.random() * (45 - 18 + 1) )) + 18;
};

function obtenerInfoUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
      })
      .then((data) => {
        const newData = data.map((usuario) => ({
            ...usuario,
            age: generarEdadAleatoria(),
            img: `/assets/img/${usuario.id}.jpeg`,
            address: `${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}`
        }));

        newData.forEach((usuario) => {
            const li = document.createElement('li');

            const divPerson = document.createElement('div');
            divPerson.classList.add('person');

            const divInfoPerson = document.createElement('div');
            divInfoPerson.classList.add('info-person');
            const name = document.createElement('p');
            name.innerHTML = `<span>Nombre: </span>${usuario.name}`;
            const age = document.createElement('p');
            age.innerHTML = `<span>Edad: </span>${usuario.age}`;
            const username = document.createElement('p');
            username.innerHTML = `<span>Username: </span>${usuario.username}`;
            const phone = document.createElement('p');
            phone.innerHTML = `<span>Teléfono: </span>${usuario.phone}`;
            const email = document.createElement('p');
            email.innerHTML = `<span>Email: </span>${usuario.email}`;
            divInfoPerson.appendChild(name);
            divInfoPerson.appendChild(age);
            divInfoPerson.appendChild(username);
            divInfoPerson.appendChild(phone);
            divInfoPerson.appendChild(email);

            const img = document.createElement('img');
            img.src= usuario.img
            img.alt = 'Fotografía del usuario';
            
            divPerson.appendChild(divInfoPerson);
            divPerson.appendChild(img);

            const company = document.createElement('p');
            company.innerHTML = `<span>Compañía: </span>${usuario.company.name}`;
            const address = document.createElement('p');
            address.innerHTML = `<span>Dirección: </span>${usuario.address}`;

            li.appendChild(divPerson);
            li.appendChild(company);
            li.appendChild(address);
            listaUsuarios.appendChild(li);
        });
      })
      .catch((error) => {
        listaUsuarios.innerText = 'Error: No se pudo obtener la información';
      });
};

obtenerInfoUsuarios();
