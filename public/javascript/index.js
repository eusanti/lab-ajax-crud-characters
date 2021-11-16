const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  

    
    document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
      .then(res =>{
        const charactersC = document.querySelector(".characters-container")
      
        let charactersInfo = ""
        res.data.reverse().forEach(minions => {
          charactersInfo += `<div class="character-info"> Id:${minions.id}</br> Nombre:${minions.name}</br> Ocupación:${minions.occupation}</br> Cartoon:${minions.cartoon}</br>Weapon:${minions.weapon}</div>`
        })
        charactersC.innerHTML = charactersInfo
      })

      .catch(err => console.log(err))
  });

  ///ONE REGISTER 
  document.getElementById('fetch-one').addEventListener('click', function (event) {
    
    const id = document.getElementById("character-id").value

    charactersAPI.getOneRegister(id)
    .then(res =>{
      const charactersC = document.querySelector(".characters-container")
      let charactersInfo = ""
  
     charactersInfo = `<div class="character-info">  Nombre:${res.data.name}</br> Ocupación:${res.data.occupation}</br> Cartoon:${res.data.cartoon}</br>Weapon:${res.data.weapon}</div>`
     charactersC.innerHTML = charactersInfo
    })
    .catch(err => console.log(err))
    });
  

   ///DELETE 
  document.getElementById('delete-one').addEventListener('click', function (event) {

    const id = document.getElementById("character-delete").value
    console.log(id)
    charactersAPI.deleteOneRegister(id)
    .then(res =>{
      document.getElementById('delete-one').style.backgroundColor = "green";
    })
    .catch(err => 
      {
      document.getElementById('delete-one').style.backgroundColor = "red";
      console.log(err)  
    })
      
      
    });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll("#edit-character-form input")
    
    const id = inputs[0].value
    const name = inputs[1].value
    const occupation =inputs[2].value
    const weapon =inputs[3].value
    const cartoon =inputs[4].checked

    const info = {name, occupation, weapon, cartoon}

    console.log(info)

    charactersAPI.updateOneRegister(id, info)
    .then(res =>{
      const charactersC = document.querySelector(".characters-container")
      let charactersInfo = ""
      console.log(res)
     charactersInfo = `<div class="character-info">  Nombre:${res.data.name}</br> Ocupación:${res.data.occupation}</br> Cartoon:${res.data.cartoon}</br>Weapon:${res.data.weapon}</div>`
     charactersC.innerHTML = charactersInfo
    })
    .catch(err => console.log(err))

        
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputsCreat = document.querySelectorAll("#new-character-form input")
  
  
    const name = inputsCreat[0].value
  const occupation = inputsCreat[1].value
  const weapon = inputsCreat[2].value
  const cartoon = inputsCreat[3].cheked
charactersAPI.createOneRegister({ name, occupation, weapon, cartoon})
});

})
